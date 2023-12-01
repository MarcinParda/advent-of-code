data = open('data.txt').read().strip()
lines = [x for x in data.split('\n')]


def tertomino_shape(turn, y):
    shape = turn % 5
    #start falling from 4 above the highest ground to optimize the search
    y+=4
    if shape==0:
        return set([(2,y), (3,y), (4,y), (5,y)])
    elif shape == 1:
        return set([(2, y+1), (3,y), (3,y+1),(3, y+2), (4,y+1)]) 
    elif shape == 2:
        return set([(2, y), (3,y), (4,y), (4,y+1), (4,y+2)])
    elif shape==3:
        return set([(2,y),(2,y+1),(2,y+2),(2,y+3)])
    elif shape==4:
        return set([(2,y), (2,y+1), (3,y), (3,y+1)])

def push_left(tertomino):
    if any([x==0 for (x,_) in tertomino]):
        return tertomino
    return set([(x-1,y) for (x,y) in tertomino])

def push_right(tertomino):
    if any([x==6 for (x,_) in tertomino]):
        return tertomino
    return set([(x+1,y) for (x,y) in tertomino])

def fall_down(tertomino):
    return set([(x,y-1) for (x,y) in tertomino])

def new_ground(tertomino):
    return set([(x,y+1) for (x,y) in tertomino])

def signature(ground):
    maxY = max([y for (x,y) in ground])
    return frozenset([(x,maxY-y) for (x,y) in ground if maxY-y<=30])

ground = set([(0, 0), (1,0), (2,0), (3,0), (4,0), (5,0), (6,0)])


highest_ground = 0
i = 0
turn = 0
L = 1000000000000

while turn < 2022:
    tertomino = tertomino_shape(turn, highest_ground)
    while True:
        if tertomino & ground:
            ground |= new_ground(tertomino)
            highest_ground = max([y for (_,y) in ground])
            break

        if lines[0][i]=='<':
            tertomino = push_left(tertomino)
            if tertomino & ground:
                tertomino = push_right(tertomino)
        else:
            tertomino = push_right(tertomino)
            if tertomino & ground:
                tertomino = push_left(tertomino)

        i = (i+1)%len(lines[0])
        tertomino = fall_down(tertomino)
    turn += 1

print(highest_ground)
import pygame

pygame.init()

screen = pygame.display.set_mode([400, 200])

running = True
currentPageNum = 1
fileExt = ".jpg"
originalImg = ""
resizedImg = ""
flippedImg = ""
avgWidth = 0
def openImg(name):
    # will run until the image is found
    print("Opening: " + fileName)
    gettingImg = True
    while gettingImg:
        # name must have file extension aswell
        try:
            image = pygame.image.load(name)
            gettingImg = False
            return image
        except Exception as e:
            print(e)

def resizeImg(img, height=None, width=None):
    # img is a pygame surface
    print("Resizing: " + fileName)
    original_h = img.get_height()
    original_w = img.get_width()
    newHeight = None
    newWidth = None
    if (height != None) and (width != None):
        newHeight = height
        newWidth = width
    elif (height != None) and (width == None):
        # aspect ratio based on height
        newHeight = height
        newWidth = (height*original_w)/original_h
    elif (height == None) and (width != None):
        # keep aspect ratio based on width
        newHeight = (width*original_h)/original_w
        newWidth = width
    resized = pygame.transform.smoothscale(img, [int(newWidth), int(newHeight)])
    return resized

def flipImg(img):
    print("Flipping: " + fileName)
    rImg = pygame.transform.flip(img, True, True)
    return rImg

def saveImg(img, suffix):
    print("Saving: " + fileName)
    pygame.image.save(img, str(currentPageNum) + suffix + fileExt)

openingnext = True

while running:
    fileName = str(currentPageNum) + fileExt

    
    print("")
    print("")
    
    originalImg = openImg(fileName)
    if currentPageNum % 2 != 0:
        #if the page number is odd auto flip it
        flippedImg = flipImg(originalImg)
        saveImg(flippedImg, "")
        originalImg = flippedImg
        
    resizedImg = resizeImg(originalImg, height=650) # Change width or height here
    avgWidth += resizedImg.get_width()
    saveImg(resizedImg, "_small")
    with open("avgWidth.txt", "w") as f:
        print("Calculating and saving avgWidth")
        f.write(str(avgWidth/currentPageNum))
    currentPageNum += 1


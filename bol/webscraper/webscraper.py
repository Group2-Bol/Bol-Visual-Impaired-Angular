import time
from selenium import webdriver
import os
from urllib import request

PATH = "C://Users//guido//Desktop//Informatica//Project D//Bol-Visual-Impaired-Angular//bol//webscraper//chromedriver.exe"
imagesStorage = "scraped_images"
imageId = 0
images = []

def createImageStorage():
    if not os.path.exists(imagesStorage):
        os.mkdir(imagesStorage)

    
def acceptCookies():
    try:
        cookieButton = driver.find_element_by_xpath('//*[@id="modalWindow"]/div[2]/div[2]/wsp-consent-modal/div[2]/button[1]')
        cookieButton.click()
    except:
        print("Hij pakt hem niet!")

def getMenus():
    subMenus = (driver.find_element_by_xpath('//*[@id="mainContent"]/div/div')).find_elements_by_tag_name('a')
    linksToSubMenus = []

    for menu in subMenus:
        menuText = menu.get_attribute("innerHTML") 
        if "Pyjama's" in menuText or "Kleding" in menuText or "Grote maten" in menuText:
            linksToSubMenus.append(menu.get_attribute('href'))
        else:
            pass
        # if "Alles" in menuText or "Sieraden" in menuText or "Accessoires" in menuText:
        #     pass
        # else:
        #     linksToSubMenus.append(menu.get_attribute('href'))
    
    navigateWebsite(linksToSubMenus)

def navigateWebsite(linksToSubMenus):
    for link in linksToSubMenus:
        driver.get(link)
        findImages()
    downloadImages()
    driver.close()
        
def findImages():
    time.sleep(2)
    try:
        content = driver.find_element_by_xpath('//*[@id="js_list_view"]/div/div[4]/div')

        foundImages = content.find_elements_by_tag_name("img")
        saveImages(foundImages)
    except:
        print("Woops, er gaat iets mis!")

def checkForDuplicates(src):
    if len(images) == 0:
        return False
    else:
        for image in images:
            if (image == src):
                return True
        return False

def saveImages(foundImages):
    for j,i in enumerate(foundImages):
        if j < hoeveelheidImages:
            src = i.get_attribute("src")
            try:
                if src != None:
                    src = str(src)
                    print('Ik heb een source! Checken voor dubbels')
                    if (checkForDuplicates(src)):
                        print("Deze afbeelding hebben wij al!")
                    else:
                        images.append(src)
                        print("Source is toegevoegd!")
                else:
                    raise TypeError
            except Exception as e:
                print("Woopsie!")


def downloadImages():
    for image in images:
        global imageId
        request.urlretrieve(image, os.path.join(imagesStorage, f"kleding{imageId}.jpg"))
        imageId += 1

hoeveelheidImages = int(input("Hoeveel afbeeldingen wil je per pagina hebben? "))
createImageStorage()
   
driver = webdriver.Chrome(PATH)
driver.get(f"https://www.bol.com/nl/nl/menu/categories/subMenu/7")
acceptCookies()
getMenus()


  


# PUI_FinalProject

## Links
- Demo Video: https://youtu.be/PbdIfHD2j6g 
- Hosted Web: https://pui-finalproject.web.app
(Some features and animations are not compatible with Safari. Chrome should work fine)
- Figma Prototypes: https://www.figma.com/file/0RTmddMQNXFZJ8a0GwynMe/PUI_FInalProject?node-id=0%3A1

## Description

The purpose of my website is to help people relieve stress by allowing users to write in detail about their feelings and thoughts related to stressful events. When I became a freshman at CMU, I usually found myself living with a constant stream of worries. While this might not be a cure for everything, I found that writing things down was a scientifically proven way to reduce stress and indeed helped me handle it quite more effectively. So that is a small trigger for me to make this small web application for people to write out their stress too on the 'sticky notes and get some practical stress management techniques. As a reminder, the caption above the sticky notes gives a heads-up of the users' state of mind and provides a support hotline when the input is extremely negative, though the sentiment analysis API I used to enable this feature is not performing very reliably and there is room for improvement on that given more time. 

In terms of the design, I tried to create a form of narrative to make visitors feel connected as much as possible. An orange avatar, typing animation, and dynamic caption were used all for the same purpose of enhancing storytelling on the website. Many elements in the first iteration were removed, such as the blue wavy nav decoration and hand-drawn style sticky note border, to make the website design look more modern and simple, especially thinking that the major goal here is to help people offload cognitive burden and de-stress. 

## Using the Website

**Navigation Bar**
* Click on the texts to navigate to one of the three sections
 
**Home Page**
* The home page is basically to prompt users to 'share what's on their mind' > click the 'Start' button to start journaling

**StickStress Page**
* Click the 'Add note' button to create new sticky notes and delete those that are no longer 'on your mind' by clicking the bin icon
* Typing in each note to input information about your thoughts and feelings, the caption changes accordingly as a response.

## External libraries

TensorFlow.js is used to run sentiment analysis on users' notes. While the algorithm is not sophisticated enough to process many expressions, it is good enough to start with. I chose this external library as it saves time on building a model from scratch, and thinking that javascript is not the most friendly language so far for statistical analysis. To use it, I called getSentimentScore() on a list that contains all the words typed by users in all sticky notes, and then display different messages on the screen depending on the value of the score the function returns. 

CSS animations were used to add some liveliness to the web tool and engage visitors. Properties like background audio, transition, transform, and animation was used to create some custom micro-interactions. The website also becomes more human as the users can get feedback as they move. 

## Iteration from Assignment 7

In my first iteration, navy blue was heavily used for the home page as well as for the navbar. The design of the sticky notes also looked different with a hand-drawn border. Those elements were got rid of and the website ended up looking more modern, minimalism, and clean. 

The caption above the sticky notes and the WhatsMore section weren't added until the last iteration, as I realized that they could be helpful for users undergoing stressful moments.  


## Challenges

The first major challenge was to research machine learning APIs for Javascript as there aren't many applicable resources and then integrate them into my own code. Another challenge I encountered was dividing the task into many pieces of helper functions and ensuring no logical errors are introduced in the process.

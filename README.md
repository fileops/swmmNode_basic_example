# swmmNode basic example
 Basic example of how to use swmmNode to translate a .out file to text. This is a bare-bones, simple-as-can-be example of how to use the swmmNode library for reading swmm .out files. Contact issac@swmmReact.org for info on more complex file structures.

 swmmNode is a JavaScript/TypeScript library with over 100 test cases and full intellisense support. For more information about swmmNode, find the Github repo here: 

 https://github.com/swmm-js/swmmNode


# Setting up your computer for development

You won't need to do a lot of work to start programming with swmmNode. While you'll be working with Node.js, npm, and Github desktop, there's really only 2 programs that you will install in this example: Node.js and Github desktop. Of course I'll walk you through each one:

## Node.js

Node.js® (https://nodejs.org/en/) is an open-source, cross-platform JavaScript runtime environment. Javascript has often been associated with programming for web browsers, but Node.js allows you to do all kinds of cool desktop and server-side programming that used to belong squarely in the domain of php, python, perl, and plenty of programming paradigms that probably aren't prepended with 'P'. JavaScript different because it starts with a 'J'. Check out some of the other details here: (https://nodejs.org/en/about/).

Download and install Node.js here: https://nodejs.org/en/

## Github Desktop

Github Desktop (https://desktop.github.com/) isn't the only way or the best way to interact with Github, but it is a colorful GUI with plenty of fun buttons to push, and that's what's really important. You'll need to sign up for a Github account (https://github.com/) but they make the process as painless as possible. 

Download and install Github Desktop here: https://desktop.github.com/

## npm

npm (https://www.npmjs.com/) stands for Node Package Manager, and believe it or not, you already installed it. To make sure I'm not lying to you, open up a command prompt (search cmd in your desktop's search widget) and type 
```
npm -v 
```
That will give you the version number of your current npm install. One last thing: their website will ask you to create an account or subscribe to the pro version. If you're into that sort of thing, don't let me stop you, but you really don't need to.

# Running this example

1. Download the github source code.
2. Open up a console (command prompt).
2. Navigate to the directory you've downloaded the code to.
3. Type:
```
npm install
```
4. Switch to the source directory:
```
cd src
```
5. Run the example code:
```
node app.js
```
6. Check out the results in the /src/Example1.txt file.

# Modifying the example

You can modify the demo to work with your own files. The following is a short set of simple changes you can make right away.

## Install your own .out file

In File Explorer, go to the directory:
```
swmmNode_basic_example\src\
```
Delete the file 'Example1.out' and copy your own .out file into this location.

## Update the source

In a text editor, open up the file
```
swmmNode_basic_example\src\app.js
```
and change the following lines:
```
let test_Example1 = './Example1.out'
```
by replacing 'Example1.out' with 'YourFileName.out'. Run the program again by using the command window and typing:
```
node app.js
```
which will run the program with your files create a new result file.

# Conclusion

Now that you have a basic idea of how to create a swmmNode app, you can move on to some of the demos for swmmNode and swmmReact. Thanks so much for taking the time to read this, and if you have any questions, you can contact me at issac@swmmReact.org.
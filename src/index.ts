/*
Description
Write a class (called “FS”) in TypeScript, that takes a directory as an argument which will act as an interface to a file system.

We need two methods in this class:

store(filename, content): Stores the content in filename within the given directory
get(filename): Returns the content from the filename

However, people are writing the same data over & over, but using different file names. Our product managers have come up with a method for saving a lot of space. So instead of storing the content as a file using the given filename, store the content using the hash of that content.

Assumptions:
md5 is a "perfect" hashing function md5("content") -> "abcdef123456"
filename - only alphabetical characters (no need to validate)

Requirements:
Content and file-content mapping needs to be persistent too
The example use-case should be added to the code, so I can test it
Use a npm/yarn script to start the dev environment
Dev env setup documentation

Example usage:
fs = FS("/topdir")
fs.store("filename1", "a very long string1")
fs.store("filename2", "a very long string1")
fs.store("filename3", "a very long string3")
fs.store("filename2", "a very long string3")
result1 = fs.get("filename1")// gets 'a very long string1'
result2 = fs.get("filename2")// gets 'a very long string3'
result3 = fs.get("filename3")// gets 'a very long string3'

In the previous example the “a very long string3” is stored only once, despite two different files having the same content.

Submit
Please push your solution to Github, and share the link of your solution.

Devops
Write a short description of how would you deploy your solution in a cloud environment (AWS, Azure, GCP). What type of resources would you use and why?
*/

import * as fileSystem from "fs";
import * as crypto from "crypto";

class FS {
  private dir: string;

  constructor(directory: string) {
    this.dir = directory;
  }

/*
  store function takes 2 inputs (filename, content)
  and return nothing.
  1. hash content
  2. check if there is a existing filename === contenthash
    if not create file with filename=contenthash and content=content
    else do nothing
  3.create a file with filename=filename and content=contenthash
*/
  store(filename: string, content: string): void {

    //1. hash content
    const hash = crypto.createHash("md5");
    const contentHash = hash.update(content).digest("hex");
    const contentPath = `${this.dir}/${contentHash}`;

    // 2. check if there is a existing filename === contenthash
    //  if not create file with filename=contenthash and content=content
    //  else do nothing
    if (!fileSystem.existsSync(contentPath)) {
      fileSystem.writeFileSync(contentPath, content);
    }

    //3.create a file with filename=filename and content=contenthash
    const filePath = `${this.dir}/${filename}`;
    fileSystem.writeFileSync(filePath, contentHash);
  }

/*
  get function takes 1 input (filename)
  and returns null if there is no file with the name filename or there is no file with the name contenthash
  else it returns the content from the file where the filename points
*/
  get(filename: string): string | null {
    const filePath = `${this.dir}/${filename}`;

    if (!fileSystem.existsSync(filePath)) {
      return null;
    }

    const contentHash = fileSystem.readFileSync(filePath, "utf-8");
    const contentFilePath = `${this.dir}/${contentHash}`;

    if (!fileSystem.existsSync(contentFilePath)) {
      return null;
    }

    return fileSystem.readFileSync(contentFilePath, "utf-8");
  }
}

// Test
let fs = new FS("./data")
fs.store("filename1", "a very long string1")
fs.store("filename2", "a very long string1")
fs.store("filename3", "a very long string3")
fs.store("filename2", "a very long string3")
let result1 = fs.get("filename1")// gets 'a very long string1'
let result2 = fs.get("filename2")// gets 'a very long string3'
let result3 = fs.get("filename3")// gets 'a very long string3'

console.log(result1)
console.log(result2)
console.log(result3)
/*
  I didnt write the comments in mind of clean code principles, its only to show my thought process.
  The answer to the devops question can be found in the README.md file.
*/
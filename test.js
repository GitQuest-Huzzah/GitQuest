const IDstring = "***REMOVED***"

// The original utf8 string
  
// Create buffer object, specifying utf8 as encoding
let bufferUTFObj = Buffer.from(IDstring, "utf8");
  
// Encode the Buffer as a base64 string
let base64String = bufferUTFObj.toString("base64");
  
console.log("The encoded base64 string is:", base64String);

  
// Create a buffer from the string
let buffer64Obj = Buffer.from(base64String, "base64");
  
// Encode the Buffer as a utf8 string
let decodedString = buffer64Obj.toString("utf8");
  
console.log("The decoded string:", decodedString);
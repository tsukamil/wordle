let db = "";

function readFile(input) {
  let file = input.files[0];
  console.log(file);

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function (progressEvent) {
    var lines = this.result.split(/\r\n|\n/);
    for (var line = 0; line < lines.length - 1; line++) {
      lines[line].length == 5 ? (db += `${lines[line]} \n`) : null;
    }
    console.log(db);
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

async function saveFile() {
  // create a new handle
  const newHandle = await window.showSaveFilePicker({
    suggestedName: "db.txt",
    types: [
      {
        description: "Words database",
        accept: {
          "text/plain": [".txt"],
        },
      },
    ],
  });

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(db);

  // close the file and write the contents to disk.
  await writableStream.close();
}

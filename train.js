const natural = require("natural");
const fs = require("fs");

// Mendefinisikan path ke folder train_data
const trainDataDir = "./train_data";

// Mendefinisikan path ke file output model
const modelFile = "./model.json";

// Mendefinisikan classifier yang akan digunakan
const classifier = new natural.BayesClassifier();

// Melakukan loop pada setiap file di dalam folder train_data
fs.readdir(trainDataDir, (err, files) => {
  if (err) {
    console.error(`Error reading train data directory: ${err}`);
    return;
  }

  // Loop pada setiap file
  files.forEach((file) => {
    // Mendapatkan label kelas dari nama file
    const classLabel = file.split(".")[0];
    console.log("Trainin label " + classLabel);

    // Mendapatkan isi file sebagai string
    const filePath = `${trainDataDir}/${file}`;
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Menambahkan data training ke classifier
    const lines = fileContent.split("\n");
    lines.forEach((line) => {
      if (line) {
        classifier.addDocument(line, classLabel);
      }
    });
  });

  // Melatih classifier
  classifier.train();

  // Menyimpan model sebagai file JSON
  const modelJson = JSON.stringify(classifier);
  fs.writeFileSync(modelFile, modelJson);

  console.log(`Classifier model saved to ${modelFile}`);
});

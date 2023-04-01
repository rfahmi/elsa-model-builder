const natural = require("natural");
const fs = require("fs");

const modelFile = "./model.json";

// Load the classifier from the model file
const classifierJson = fs.readFileSync(modelFile, "utf-8");
const classifier = natural.BayesClassifier.restore(JSON.parse(classifierJson));

describe("Text classification", () => {
  it("should correctly classify text", () => {
    const text1 = "buatkan saya kode untuk melakukan perhitungan luas persegi";
    const text2 =
      "berikan gambar tentang ilustrasi blackhole yang paling akurat";
    const text3 = "apakah node js adalah framework terbaik yang pernah ada";
    const text4 = "nyalakan lampu kamar 1";

    const classification1 = classifier.getClassifications(text1);
    const classification2 = classifier.getClassifications(text2);
    const classification3 = classifier.getClassifications(text3);

    console.log("Classification 1:", classification1);
    console.log("Classification 2:", classification2);
    console.log("Classification 3:", classification3);

    expect(classifier.classify(text1)).toEqual("CODING");
    expect(classifier.classify(text2)).toEqual("IMAGE_GENERATION");
    expect(classifier.classify(text3)).toEqual("CODING");
  });
});

function getClass() {
  class GitTest {
    constructor(tex) {
      console.log("hihi");
      console.log(tex);
    }
  }
  return GitTest;
}

window.classLoaded = true;
const LEVELS = [];
const makeNewLevel = ()=>{
  const lvl = new Array(13);
  for (var i = 13 - 1; i >= 0; i--) {
    lvl[i] =  new Array(13)
  }
  return lvl
}

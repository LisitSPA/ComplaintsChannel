export function dynamicColors() {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

function getPoolColors(count: number) {
  var pool = [];
  for(let i = 0; i < count; i++) {
      pool.push(dynamicColors());
  }

  return pool;
}

export default getPoolColors;

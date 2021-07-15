
export function getTimeStamp(dateParam) {
  const now = new Date();
  const date = new Date(dateParam);
  let diff = Math.floor(((now.getTime() - date.getTime()) / 1000));
  let label = "seconde" + (diff > 1 ? 's' : '');
  if (diff > 59) {
    diff = Math.floor(diff / 60);
    label = "minute" + (diff > 1 ? 's' : '');
    if (diff > 59) {
      diff = Math.floor(diff / 60);
      label = "heure" + (diff > 1 ? 's' : '');
      if (diff > 24) {
        diff = Math.floor(diff / 24);
        label = " jour" + (diff > 1 ? 's' : '');
        if (diff > 30) {
          diff = Math.floor(diff / 30);
          label = "mois";
          if (diff > 12) {
            label = "";
            diff = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
          }
        }
      }
    }
  }
  if (label != '') {
    return "Il y'a " + diff + " " + label;
  } else {
    return "Le " + diff;
  }
}
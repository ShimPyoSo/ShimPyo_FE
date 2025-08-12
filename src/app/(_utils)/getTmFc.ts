export default function getTmFc() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hour = now.getHours();

  let timePart = '0600';
  if (hour >= 19) {
    timePart = '1800';
  }

  const tmFc = `${year}${month}${date}${timePart}`;
  return tmFc;
}

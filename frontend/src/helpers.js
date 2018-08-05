export default function isValid(value) {
  return !Number.isNaN(value) && value >= 0;
}

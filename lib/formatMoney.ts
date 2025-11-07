export function formatMoney(amount:any) {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

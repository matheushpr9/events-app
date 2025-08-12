export default function getSubscriptionPlan(plan: string): string {
  switch (plan) {
    case 'prod_SouCvMCgWDZpU8':
      return 'Anual';
    case 'prod_SouBi7pD9NODjG':
      return 'Semestral';
    case 'prod_SouAdkesWBRlnv':
      return 'Mensal';
    default:
      return '';
  }
}

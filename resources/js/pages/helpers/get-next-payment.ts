export default function getNextPaymentDate(plan: string | null, createdAt: string | null): string {
    switch (plan) {
    case 'prod_SouCvMCgWDZpU8': {
      if (!createdAt) return '--';
      const nextYear = new Date(createdAt);
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      return nextYear.toLocaleDateString('pt-BR');
    }
    case 'prod_SouBi7pD9NODjG': {
        if (!createdAt) return '--';
        const nextSixMonthsDate = new Date(createdAt);
        nextSixMonthsDate.setMonth(nextSixMonthsDate.getMonth() + 6);
        return nextSixMonthsDate.toLocaleDateString('pt-BR');
    }
    case 'prod_SouAdkesWBRlnv': {
        if (!createdAt) return '--';
        const nextMonth = new Date(createdAt);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return nextMonth.toLocaleDateString('pt-BR');
    }
    default:
      return '';
  }
}

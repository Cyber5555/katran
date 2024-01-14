const useFormatNumberWithDots = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const useNumberWithDots = (number) => {
  let dotNumber;
  dotNumber = useFormatNumberWithDots(number);
  return dotNumber;
};

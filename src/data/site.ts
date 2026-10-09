export const site = {
  name: "Olavo de Vilhena Lima",
  shortName: "Olavo",
  place: "Vila Velha, ES",
  email: "olavodevilhenalima@gmail.com",
  whatsapp: "5527981218258",
  linkedin: "https://www.linkedin.com/in/olavostauros",
  github: "https://github.com/olavostauros",
};

export function whatsappLink(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

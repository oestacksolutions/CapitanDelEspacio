import ezpeletaImg from '../assets/history/ezpeleta-1962.webp';
import bernalImg from '../assets/history/bernal-1963.webp';
import presenteImg from '../assets/history/presente-2012.webp';
import quilmesImg from '../assets/history/quilmes-1972.webp';

export const COMPANY_INFO = {
  companyName: 'Capitán del Espacio',
  slogan: 'Primeros en la conquista del buen gusto',
};

export const HISTORY_MILESTONES = [
  {
    year: '2 de febrero de 1962',
    location: 'Ezpeleta',
    title: 'Los primeros pasos entre dos amigos',
    description:
      'Comienza la historia del Capitán del Espacio como una pequeña empresa iniciada por dos amigos: Arturo y Ángel. Durante el primer año la fábrica funciona en Ezpeleta.',
    image: ezpeletaImg,
    imageAlt: 'Comienzos de Capitán del Espacio en Ezpeleta en 1962',
  },
  {
    year: '1963 – 1972',
    location: 'Luis María Campos, Bernal Oeste',
    title: 'Diez años de trabajo artesanal',
    description:
      'La fábrica se muda a un espacio mayor en la calle Luis María Campos en Bernal Oeste, donde durante diez años se producen los alfajores con trabajo mayormente artesanal, dedicación y muchas horas.',
    image: bernalImg,
    imageAlt: 'Etapa artesanal en Luis María Campos, Bernal Oeste (1963–1972)',
  },
  {
    year: '23 de diciembre de 1972',
    location: 'Gran Canaria, Quilmes',
    title: 'Llegada a la planta de Quilmes',
    description:
      'La fábrica se traslada a su ubicación en la calle Gran Canaria en Quilmes. Con el tiempo, Ángel Lineo De Pascalis queda al frente, cuidando el sabor y la calidad frente a la evolución de las maquinarias.',
    image: quilmesImg,
    imageAlt: 'Planta de Capitán del Espacio en Gran Canaria, Quilmes (1972)',
  },
  {
    year: 'Agosto de 2012 – Presente',
    location: 'Quilmes y todo el país',
    title: 'Continuar la obra y el sueño',
    description:
      'Tras el fallecimiento de Ángel Lineo De Pascalis en agosto de 2012, las personas más allegadas trabajan para mantener viva su obra con el mismo sabor y calidad de siempre junto a empleados, proveedores y clientes.',
    image: presenteImg,
    imageAlt: 'Continuidad de Capitán del Espacio en Quilmes y todo el país desde 2012',
  },
];
// ===============================================
// 📦 lib/menu-data.ts
// Bocanada Cocina de Brassa - Menú completo (versión estable)
// ===============================================

export type Dish = {
  name: string;
  desc: string;
  price: string;
  category: string;
  img: string;
};

// =======================
// 🥩 CATEGORÍAS PRINCIPALES
// =======================
export const CATEGORIES = [
  "Favoritos del Chef",
  "Entradas",
  "Empanadas",
  "Ensaladas",
  "Pastas",
  "Quesos Fundidos",
  "Hamburguesas",
  "Tacos y Sándwiches",
  "Bebidas y Cocteles"
] as const;

// =======================
// 🍽️ PLATILLOS
// =======================
export const DISHES: Dish[] = [
  // 🔸 Favoritos del Chef
  {
    name: "Canelones",
    desc: "De carne o espinaca, bañados en salsa pomodoro, gratinados con queso Gouda y parmesano rallado.",
    price: "$185",
    category: "Favoritos del Chef",
    img: "/menu/canelones.jpg",
  },
  {
    name: "Lasagna Uruguaya",
    desc: "Lasagna casera con carne o espinaca, salsa pomodoro y gratinada con queso Gouda y parmesano.",
    price: "$199",
    category: "Favoritos del Chef",
    img: "/menu/lasagna-uruguaya.jpg",
  },
  {
    name: "Milanesa Napolitana de Pollo",
    desc: "Milanesa de pollo con salsa pomodoro, jamón de pavo y queso Gouda gratinado, acompañada de papas fritas.",
    price: "$199",
    category: "Favoritos del Chef",
    img: "/menu/milanesa-napolitana-pollo.jpg",
  },
  {
    name: "Milanesa Napolitana de Res",
    desc: "Milanesa de res con salsa pomodoro, jamón de pavo y queso Gouda gratinado, acompañada de papas fritas.",
    price: "$199",
    category: "Favoritos del Chef",
    img: "/menu/milanesa-napolitana-res.jpg",
  },

  // 🔸 Entradas
  {
    name: "Papa Parrilla",
    desc: "Horneada en mantequilla con hierbas de olor, rellena de queso, tocino y crema.",
    price: "$119",
    category: "Entradas",
    img: "/menu/papa-parrilla.jpg",
  },
  {
    name: "Queso Provoleta",
    desc: "200 gm de queso provolone a la plancha con jitomate y orégano.",
    price: "$135",
    category: "Entradas",
    img: "/menu/queso-provoleta.jpg",
  },
  {
    name: "Espárragos Envueltos",
    desc: "Espárragos salteados, envueltos en tocino con reducción de vino tinto con café.",
    price: "$99",
    category: "Entradas",
    img: "/menu/esparragos-envueltos.jpg",
  },
  {
    name: "Aguachile de Camarón",
    desc: "Aguachile verde con pepino, cebolla y aguacate al estilo Bocanada.",
    price: "$239",
    category: "Entradas",
    img: "/menu/aguachile-camaron.jpg",
  },
  {
    name: "Tostadas Gemelas de Atún",
    desc: "Atún aleta azul, pepino, cebolla, mango y aguacate. Fresco y balanceado.",
    price: "$199",
    category: "Entradas",
    img: "/menu/tostadas-atun.jpg",
  },

  // 🔸 Empanadas
  {
    name: "Empanada de Carne",
    desc: "Carne molida con el toque especial de la casa.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-carne.jpg",
  },
  {
    name: "Empanada de Elote",
    desc: "Grano de elote guisado en mantequilla con mix de quesos.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-elote.jpg",
  },
  {
    name: "Empanada de Espinaca",
    desc: "Espinacas guisadas en mantequilla con queso doble crema.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-espinaca.jpg",
  },
  {
    name: "Empanada de Chistorra",
    desc: "Chistorra a la parrilla con mix de quesos.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-chistorra.jpg",
  },
  {
    name: "Empanada Hawaiana",
    desc: "Jamón, piña y queso al estilo uruguayo.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-hawaiana.jpg",
  },
  {
    name: "Empanada de Jamón",
    desc: "Jamón de pavo y queso gratinado.",
    price: "$52",
    category: "Empanadas",
    img: "/menu/empanada-jamon.jpg",
  },

  // 🔸 Ensaladas
  {
    name: "Ensalada Tropical",
    desc: "Mix de lechugas, arándano, nuez, frutos, queso de cabra y aderezo de la casa.",
    price: "$120",
    category: "Ensaladas",
    img: "/menu/ensalada-tropical.jpg",
  },
  {
    name: "Ensalada Bocanada",
    desc: "Mix de lechugas, morrón, jitomate, zanahoria, aguacate y pechuga empanizada.",
    price: "$180",
    category: "Ensaladas",
    img: "/menu/ensalada-bocanada.jpg",
  },
  {
    name: "Burrata",
    desc: "Arúgula, espinaca, jitomate cherry, queso burrata y aderezo de café.",
    price: "$160",
    category: "Ensaladas",
    img: "/menu/burrata.jpg",
  },
  {
    name: "Ensalada César",
    desc: "Clásica con crutones, parmesano y pollo a la parrilla.",
    price: "$140",
    category: "Ensaladas",
    img: "/menu/ensalada-cesar.jpg",
  },

  // 🔸 Pastas
  {
    name: "Fettuccini",
    desc: "Pasta con salsa de tu elección: 4 quesos, bolognesa, pesto o al burro.",
    price: "$149",
    category: "Pastas",
    img: "/menu/fettuccini.jpg",
  },
  {
    name: "Fusilli",
    desc: "Pasta con salsa de tu elección: 4 quesos, bolognesa, pesto o al burro.",
    price: "$159",
    category: "Pastas",
    img: "/menu/fusilli.jpg",
  },
  {
    name: "Ravioles",
    desc: "7 piezas rellenas, con salsa de tu preferencia: 4 quesos, bolognesa o pesto.",
    price: "$199",
    category: "Pastas",
    img: "/menu/ravioles.jpg",
  },

  // 🔸 Quesos Fundidos
  {
    name: "Queso Fundido con Chistorra",
    desc: "180 gm de mix de quesos gourmet acompañados de chistorra.",
    price: "$119",
    category: "Quesos Fundidos",
    img: "/menu/queso-fundido-chistorra.jpg",
  },
  {
    name: "Queso Fundido con Arrachera",
    desc: "180 gm de mix de quesos gourmet con arrachera a la brasa.",
    price: "$139",
    category: "Quesos Fundidos",
    img: "/menu/queso-fundido-arrachera.jpg",
  },
  {
    name: "Queso Fundido con Chorizo Argentino",
    desc: "Queso fundido con toque de chorizo argentino.",
    price: "$135",
    category: "Quesos Fundidos",
    img: "/menu/queso-fundido-chorizo.jpg",
  },
  {
    name: "Queso Fundido con Champiñones",
    desc: "Queso fundido con champiñones salteados al vino blanco.",
    price: "$125",
    category: "Quesos Fundidos",
    img: "/menu/queso-fundido-champinon.jpg",
  },

  // 🔸 Hamburguesas
  {
    name: "Hamburguesa Bocanada",
    desc: "Carne de res, queso Gouda, mayo chipotle, lechuga, jitomate, chorizo argentino y huevo estrellado.",
    price: "$199",
    category: "Hamburguesas",
    img: "/menu/hamburguesa-bocanada.jpg",
  },
  {
    name: "Hamburguesa Hawaiana",
    desc: "Carne de res, queso Gouda, jamón de pavo y piña. Acompañada de papas fritas.",
    price: "$189",
    category: "Hamburguesas",
    img: "/menu/hamburguesa-hawaiana.jpg",
  },
  {
    name: "Hamburguesa Criolla",
    desc: "Carne de res, huevo estrellado, lechuga, tomate, chorizo argentino y aderezo de ajo.",
    price: "$189",
    category: "Hamburguesas",
    img: "/menu/hamburguesa-criolla.jpg",
  },
  {
    name: "Hamburguesa de Champiñón",
    desc: "Hamburguesa vegetariana con portobello, queso gouda y aderezo de la casa.",
    price: "$175",
    category: "Hamburguesas",
    img: "/menu/hamburguesa-champinon.jpg",
  },

  // 🔸 Tacos y Sándwiches
  {
    name: "Tacos de Sirloin",
    desc: "3 tacos de carne de sirloin con cebolla, chiles salteados y papas fritas.",
    price: "$149",
    category: "Tacos y Sándwiches",
    img: "/menu/tacos-sirloin.jpg",
  },
  {
    name: "Tacos de Pollo",
    desc: "3 tacos de pollo a la parrilla con pico de gallo.",
    price: "$135",
    category: "Tacos y Sándwiches",
    img: "/menu/tacos-pollo.jpg",
  },
  {
    name: "Tacos de Arrachera",
    desc: "3 tacos de arrachera marinada con cebolla y chiles salteados, acompañados de papas.",
    price: "$149",
    category: "Tacos y Sándwiches",
    img: "/menu/tacos-arrachera.jpg",
  },
  {
    name: "Choripán",
    desc: "Chorizo argentino con aderezo mayo-chipotle, lechuga y jitomate.",
    price: "$120",
    category: "Tacos y Sándwiches",
    img: "/menu/choripan.jpg",
  },
  {
    name: "Choriqueso",
    desc: "Chorizo argentino mezclado con queso fundido en pan artesanal.",
    price: "$130",
    category: "Tacos y Sándwiches",
    img: "/menu/choriqueso.jpg",
  },
  {
    name: "Sándwich de Arrachera",
    desc: "Pan artesanal con arrachera, lechuga, tomate y aderezo de ajo.",
    price: "$140",
    category: "Tacos y Sándwiches",
    img: "/menu/sandwich-arrachera.jpg",
  },
  {
    name: "Sándwich Bocanada",
    desc: "Pechuga a la parrilla con tocino, queso gouda y vegetales frescos.",
    price: "$135",
    category: "Tacos y Sándwiches",
    img: "/menu/sandwich-bocanada.jpg",
  },
  {
    name: "Chivito",
    desc: "Clásico uruguayo con carne de res, jamón, huevo, tocino, lechuga y tomate.",
    price: "$160",
    category: "Tacos y Sándwiches",
    img: "/menu/chivito.jpg",
  },

  // 🔸 Bebidas y Cocteles
  {
    name: "Mojito Natural",
    desc: "Hierbabuena, limón, azúcar, ron y un toque de soda.",
    price: "$120",
    category: "Bebidas y Cocteles",
    img: "/menu/mojito.jpg",
  },
  {
    name: "Aperol Spritz",
    desc: "Aperol, prosecco y soda con rodaja de naranja.",
    price: "$150",
    category: "Bebidas y Cocteles",
    img: "/menu/aperol.jpg",
  },
  {
    name: "Limonada de Hierbabuena",
    desc: "Refrescante mezcla de limón natural con toque de hierbabuena.",
    price: "$85",
    category: "Bebidas y Cocteles",
    img: "/menu/limonada-hierbabuena.jpg",
  },
];

// =======================
// 📤 EXPORTS
// =======================
export const getDishesByCategory = (category: string) => {
  return DISHES.filter((dish) => dish.category === category);
};

export const getFeaturedDishes = () => {
  return DISHES.filter((dish) => dish.category === "Favoritos del Chef");
};

export const getAllDishes = () => {
  return DISHES;
};
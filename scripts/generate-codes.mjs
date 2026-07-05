// Genera códigos hex únicos de 4 dígitos para la lista de invitados.
// Uso: npm run generate-codes
// Editá el array NAMES con la lista real (un item por invitación;
// parejas/familias van juntas con su partySize).
//
// La salida es el valor para la variable GUESTS_JSON:
//   - en dev: pegalo en .env.local
//   - en prod: pegalo en Vercel > Settings > Environment Variables (y redeploy)

import { randomBytes } from "node:crypto";

const NAMES = [
  { name: "Juan Pérez", partySize: 1 },
  { name: "Ana y Martín", partySize: 2 },
  { name: "Familia Rodríguez", partySize: 4 },
  { name: "Sofía González", partySize: 1 },
  { name: "Caro y Lucas", partySize: 2 },
];

function generateCode(used) {
  // 2 bytes aleatorios = 4 dígitos hex (0000-ffff)
  let code;
  do {
    code = randomBytes(2).toString("hex");
  } while (used.has(code));
  used.add(code);
  return code;
}

const used = new Set();
const guests = NAMES.map((g) => ({ code: generateCode(used), ...g }));

console.log("Tabla (para tu control / mandar los links):\n");
for (const g of guests) {
  console.log(`  ${g.code}  |  ${g.name} (${g.partySize})  |  /i/${g.code}`);
}

console.log("\nValor para GUESTS_JSON (una sola linea):\n");
console.log(`GUESTS_JSON='${JSON.stringify(guests)}'`);

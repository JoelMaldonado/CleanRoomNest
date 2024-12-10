export function encriptar(cadena: string): string {
    let resultado = '';
    for (let i = 0; i < cadena.length; i++) {
      const charCode = cadena[i].toUpperCase().charCodeAt(0);
      const nuevoCharCode = charCode + 10 + (i + 1) * 3;
      resultado += String.fromCharCode(nuevoCharCode);
    }
    return resultado;
  }
  
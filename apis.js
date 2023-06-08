const API = 'http://10.0.0.133:3000/formulas'
const API2 = 'http://10.0.0.133:3000/materials'

export const getFormulas = async() => {
    const res = await fetch(API);
    return await res.json();
}

export const getFormulaWithMaterials = async(id) => {
    const res = await fetch(`${API2}/${id}`)
    return await res.json();
}
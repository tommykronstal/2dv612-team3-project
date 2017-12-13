const isMaterial = match => match.key.includes('materials')

const formatMatchingProduct = (results, { item, matches }) => {
  matches
    .map(match => ({
      productId: item._id,
      name: item.name,
      companyName: item.companyName,
      category: item.category,
      isMaterial: isMaterial(match),
      material: isMaterial(match) ? item.materials[match.arrayIndex] : undefined  
    }))
    .forEach(result => results.push(result))

  return results
} 

export const formatSearchResult = data => {
  return data.reduce(formatMatchingProduct, [])
}

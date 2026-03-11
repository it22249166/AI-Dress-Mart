const curatedFallbacks = {
  casual1:
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  evening1:
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80',
  cocktail1:
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
};

const placeholderHosts = ['via.placeholder.com', 'placehold.co'];

export const getProductImageUrl = (product) => {
  const primaryImage = product?.images?.[0];
  const rawUrl = primaryImage?.url?.trim();

  if (rawUrl) {
    const isPlaceholder = placeholderHosts.some((host) => rawUrl.includes(host));
    if (!isPlaceholder) {
      return rawUrl;
    }
  }

  if (primaryImage?.public_id && curatedFallbacks[primaryImage.public_id]) {
    return curatedFallbacks[primaryImage.public_id];
  }

  return null;
};

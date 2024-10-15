const formatTitleForUrl = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

export default formatTitleForUrl;
const formatGridData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ empty: true, id: data.length });
        numberOfElementsLastRow++;
    }

    return data.map((item, index) => {
        if (!((index + 1) % numColumns)) item.lastItemInRow = true;
        return item;
    });
};

export default formatGridData;

module.exports = {
    getTransportMode: (distance) => {
        if (distance > 500) return { mode: 'Aeroplane', rate: 1 };
        if (distance > 100) return { mode: 'Truck', rate: 2 };
        return { mode: 'Mini Van', rate: 3 };
    },
};

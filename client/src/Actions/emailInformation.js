// set pop up send information email auction

export default function createAuctionPU(condition) {
    return {type: 'POP_UP_AUCTION_EMAIL', payload: condition};
}
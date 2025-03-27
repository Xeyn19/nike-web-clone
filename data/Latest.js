class latestShoe {
    id;
    image;
    name;

    constructor(shoeDetails){
    this.id = shoeDetails.id;
    this.image = shoeDetails.image;
    this.name = shoeDetails.name;
    }
}
export const latestShoes = [{
    id:'01',
    image:'../images/Lebron12PE.png',
    name:`Nike Lebron 12 'Akron'`,

},
{
    id:'02',
    image:'../images/Sabrina2.jpg',
    name:`Sabrina 2 'Mirrored'`,

},{
    id:'03',
    image:'../images/Ja2.jpg',
    name:`Ja2 'Nightmare'`,

},{
    id:'04',
    image:'../images/NikeGT3.jpg',
    name:`NIKE Men's G.T. CUT 3`,
},{
    id:'05',
    image:'../images/Tatum3.png',
    name:`Tatum 3 PF 'Welcome to the Garden'`,
},{
    id:'06',
    image:'../images/Tatum3Zen.jpg',
    name:`Air Jordan Tatum 3 PF 'Zen'`,
},{
    id:'07',
    image:'../images/Ja2Purple.jpg',
    name:`Ja 2 'Purple Sky'`,
}].map((shoeDetails) => {
    return new latestShoe(shoeDetails);
});
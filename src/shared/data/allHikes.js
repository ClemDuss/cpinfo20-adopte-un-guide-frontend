const allHikes = [
    {
        title: "Pointe percée",
        location:{
            start: {
                name: "Col des Annes, Le Grand-Bornand ",
                lat: 45.970650214441456,
                lng: 6.523779387023718
            },
            finish:{
                name : "Pointe Percée",
                lat: 45.9569876206188,
                lng: 6.555536742708125
            }
        },
        guide: "Fred", 
        shortDescription: "Une rando dont le sommet se situe à un peu plus de 2700m. Des passages aériens notamment sur la fin. la seconde moitiée de l'itinéraire est de la rando/grimpe dans le rocher.",
        hikeId: "2",
        difficulty: 4,
        duration: 2.5,
        pictures: ['dev/pte-percee-croix.jpg', 'dev/pte-percee.jpg']
    },
    {
        title: "Lac Blanc",
        location:{
            start: {
                name: "Argentière - Gare",
                lat: 45.98229850090379,
                lng: 6.926181075432063
            },
            finish:{
                name : "Le Lac Blanc",
                lat: 45.98143179097631,
                lng: 6.8916807868436925
            }
        },
        guide: "Fred", 
        shortDescription: "Au départ d'argentière, peu paitre un peu long mais sans difficulté. Une magnifique vue sur le massif du Mont-Blanc tout le long de la ranonnée.",
        hikeId: "4",
        difficulty: 2,
        duration: 3,
        pictures: ['dev/lac-blanc.jpg']
    },
    {
        title: "L'Étale",
        location:{
            start: {
                name: "Comburce, Manigod",
                lat: 45.85340292676925,
                lng: 6.414526296187185
            },
            finish:{
                name : "L'Étale",
                lat: 45.850264347078685,
                lng: 6.4474423650645845
            }
        },
        guide: "Michel", 
        shortDescription: "Une rando qui se terrmine très raide, limite escalade mais sans assurage nécessaire. Possible traversée vers la Mandallaz une fois au sommet.",
        hikeId: "3",
        difficulty: 4,
        duration: 4,
        pictures: ['dev/etale.jpg']
    },
    {
        title: "La Jonction",
        location:{
            start: {
                name: "Les Bossons",
                lat: 45.89915086325382,
                lng: 6.84469133240456
            },
            finish:{
                name : "La Jonction",
                lat: 45.8782520513738,
                lng: 6.856961035739565
            }
        },
        guide: "Alain", 
        shortDescription: "Une randonnée qui est longue, mais une arrivée au sommet à la jontcion entre le glacier des Bossons et l'autre. on se sent encore plus proche du Mont-Blanc!.",
        hikeId: "5",
        difficulty: 3,
        duration: 4,
        pictures: ['dev/jonction.jpg', 'dev/jonction2.jpg', 'dev/jonction3.jpg']
    },
    {
        title: "Le Buet",
        location:{
            start: {
                name: "Gare du Buet",
                lat: 46.01919986039579,
                lng: 6.920373418395956
            },
            finish:{
                name : "Le Buet",
                lat: 46.025786445566816,
                lng: 6.852128311330438
            }
        },
        guide: "Tony", 
        shortDescription: "Une rando avec une nuit en refuge. C'est une très bonne initiation à la haute montagne avec un sommet à plus de 3000m",
        hikeId: "6",
        difficulty: 5,
        duration: 36,
        pictures: []
    }
]

export default allHikes;
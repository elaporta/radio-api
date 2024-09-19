'use strict';

const fs = require('fs');
const path = require('path');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        try {
            const radios = [
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.usa.json'), 'utf-8')),
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.esp.json'), 'utf-8')),
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.arg.json'), 'utf-8')),
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.ury.json'), 'utf-8')),
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.chl.json'), 'utf-8')),
                ...JSON.parse(fs.readFileSync(path.join(__dirname, './jsons/raddios.bra.json'), 'utf-8')),
            ]

            const formattedData = radios.map((radio) => ({
                title: String(radio.title).trim().replace(/\s+/g, ' '),
                img_url: radio.img_url,
                img_file: radio.img,
                stream_url: radio.stream,
                country: radio.country,
                locations: String(JSON.stringify(radio.location)).toLowerCase(),
                genres: String(JSON.stringify(radio.genres)).toLowerCase(),
                description: String(radio.description).trim().replace(/\s+/g, ' '),
                ranking: radio.ranking,
                url: radio.web,
                raddios_url: radio.url
            }));

            await queryInterface.bulkInsert('radios', formattedData, {});
        }
        catch(error) {
            console.log(error);
        }
    },

    async down (queryInterface, Sequelize) {
        await queryInterface.bulkDelete('radios', { country: 'USA' }, {});
    }
};

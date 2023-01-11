let gameDataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'

let gameData

let canvas = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawTreeMap = () => {
    let hierarchy = d3.hierarchy(gameData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap()
                          .size([1200, 800])

    createTreeMap(hierarchy)

    let gameTiles = hierarchy.leaves()
    console.log(gameTiles)

    let block = canvas.selectAll('g')
                      .data(gameTiles)
                      .enter()
                      .append('g')
                      .attr('transform', (game) => {
                          return 'translate(' + game['x0'] + ', ' + game['y0'] + ')' 
                      })
    
    block.append('rect')
         .attr('class', 'tile')
         .attr('fill', (game) => {
            let category = game['data']['category']
            if (category === 'Wii') {
                return '#1abc9c' //Turquoise
            } else if (category === 'GB') {
                return '#16a085' //Green Sea
            } else if (category === 'PS2') {
                return '#2ecc71' //Emerald
            } else if (category === 'SNES') {
                return '#27ae60' //Nephritis
            } else if (category === 'GBA') {
                return '#3498db' //Peter River
            } else if (category === '2600') {
                return '#2980b9' //Belize Hole
            } else if (category === 'DS') {
                return '#9b59b6' //Amethyst
            } else if (category === 'PS3') {
                return '#8e44ad' //Wisteria
            } else if (category === '3DS') {
                return '#34495e' //Wet Asphalt
            } else if (category === 'PS') {
                return '#2c3e50' //Midnight Blue
            } else if (category === 'XB') {
                return '#f1c40f' //Sun Flower
            } else if (category === 'PSP') {
                return '#f39c12' //Orange
            } else if (category === 'X360') {
                return '#e67e22' //Carrot
            } else if (category === 'NES') {
                return '#d35400' //Pumpkin
            } else if (category === 'PS4') {
                return '#e74c3c' //Alizarin
            } else if (category === 'N64') {
                return '#c0392b' //Pomegranate
            } else if (category === 'PC') {
                return '#bdc3c7' //Silver
            } else if (category === 'XOne') {
                return '#7f8c8d' //Asbestos
            }
         })
         .attr('data-name', (game) => {
            return game['data']['name']
         })
         .attr('data-category', (game) => {
            return game['data']['category']
         })
         .attr('data-value', (game) => {
            return game['data']['value']
         })
         .attr('width', (game) => {
            return game['x1'] - game['x0']
         })
         .attr('height', (game) => {
            return game['y1'] - game['y0'] 
         })
         .on('mouseover', (event, game) => {
            tooltip.transition()
                   .style('visibility', 'visible')

            let sales = game['data']['value']

            tooltip.html(
                '<b>' + sales + 'M Sales </b> - ' + game['data']['name']
            )
            tooltip.attr('data-value', game['data']['value'])
         })
         .on('mouseout', (event, game) => {
            tooltip.transition()
                   .style('visibility', 'hidden')
         })

    block.append('text')
         .text((game) => {
            return game['data']['name']
         })
         .attr('x', 5)
         .attr('y', 20)
}

d3.json(gameDataURL).then(
    (data, error) => {
        if (error) {
            console.log(log)
        } else {
            gameData = data
            // console.log(gameData)
            drawTreeMap()
        }
    }
)
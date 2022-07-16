// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

var village_viz = d3.select("svg.village-viz")
var bridge_viz = d3.select("svg.bridge-viz")

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.70);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        // .style("height", figureHeight + "px")
        .style("height", (window.innerHeight) + "px")
        .style("top", "5%");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepProgress(response) {
    // console.log(response);
    index = response.index;
    progress = response.progress;

    village_opacity = village_viz.style("opacity");
    bridge_opacity = bridge_viz.style("opacity");
    // response = { element, direction, index }

    // resetGraphic(index, progress);

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // update graphic based on step
    // figure.select("p").html((response.index) + "<br><br><p style='font-size:14px;'>" + Math.round(response.progress * 100) + "%</p>");
    figure.select("p").style("opacity", 0)
    
    switch(index){
        case 0: 
            excluded_opacity = village_viz.select(".excluded_white_border").style("opacity");

            if( excluded_opacity == 0 ) {
                village_viz
                    .select(".excluded_white_border")
                    .transition()
                    .duration(1000)
                    .delay(0)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                village_viz
                    .select(".excluded_black_border")
                    .transition()
                    .duration(1000)
                    .delay(0)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                village_viz
                    .select(".excluded")
                    .transition()
                    .duration(1000)
                    .delay(1000)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 1);

                village_viz
                    .select(".excluded_text")
                    .transition()
                    .duration(1000)
                    .delay(1200)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }
            break;

        case 1:
            if (village_opacity == 0 && progress <= 0.66) {
                village_viz
                    .transition()
                    .duration(500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                document.body.style.backgroundColor = "#fff";
                
                village_viz.select(".excluded").style("opacity", 0);
                village_viz.select(".excluded_text").style("opacity", 0);
                village_viz.select(".excluded_black_border").style("opacity", 0);
                village_viz.select(".excluded_white_border").style("opacity", 0);
            }
            else if (progress > 0.66 && village_opacity == 1){
                village_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);

                    document.body.style.backgroundColor = "#D49861";
            }
            break;

        case 2:
            if (village_opacity == 1) {
                village_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }

            if (progress <= 0.90 && bridge_opacity == 1){
                bridge_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }

            if (progress > 0.90 && bridge_opacity == 0){
                bridge_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }
            break;

        case 3:
            ends_opacity = bridge_viz.selectAll(".bridge__graphic > .bridge__ends").style("opacity");

            if( progress > 0.60 && ends_opacity == 0){
                bridge_viz.selectAll(".bridge__graphic > .bridge__ends")
                    .transition()
                    .duration(500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }

            if( progress <= 0.60 && ends_opacity == 1){
                bridge_viz.selectAll(".bridge__graphic > .bridge__ends")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }
            break;
        
        case 4:
            posts_opacity = bridge_viz.selectAll(".bridge__posts").style("opacity");
            ropes_opacity = bridge_viz.selectAll(".bridge__ropes").style("opacity");
            road_mid_opacity = bridge_viz.selectAll(".bridge__road .bridge__mid").style("opacity");

            // Show all 3 groups if they are all not visible and progress > 10%
            if( progress > 0.10 && posts_opacity == 0 && ropes_opacity == 0 && road_mid_opacity == 0){
                bridge_viz.selectAll(".bridge__posts")
                    .transition()
                    .duration(500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                bridge_viz.selectAll(".bridge__ropes")
                    .transition()
                    .duration(800)
                    .delay(500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                bridge_viz.selectAll(".bridge__road .bridge__mid")
                    .transition()
                    .duration(1000)
                    .delay((d,i) => i * 500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }
            
            if( progress <= 0.10 && posts_opacity == 1 && ropes_opacity == 1 && road_mid_opacity == 1){
                bridge_viz.selectAll(".bridge__posts")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);

                bridge_viz.selectAll(".bridge__ropes")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);

                bridge_viz.selectAll(".bridge__road .bridge__mid")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }
            break;

        case 5: 
            road_final_opacity = bridge_viz.selectAll(".bridge__road .bridge__final").style("opacity");

            if( progress > 0.10 && road_final_opacity == 0){
                bridge_viz.selectAll(".bridge__road .bridge__final")
                    .transition()
                    .duration(500)
                    .delay((d,i) => i * 500)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }
            if( progress <= 0.10 && road_final_opacity == 1){
                bridge_viz.selectAll(".bridge__road .bridge__final")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }
            break;

        case 6:
            people_opacity = bridge_viz.selectAll(".bridge__people").style("opacity");

            if( progress > 0.10 && people_opacity == 0){
                bridge_viz.selectAll(".bridge__people")
                    .style("opacity", 1);

                bridge_viz
                    .selectAll(".bridge__people")
                    .selectAll("path")
                        .style("opacity", 0);

                bridge_viz
                    .selectAll(".bridge__people")
                    .selectAll("path")
                        .transition()
                        .duration(200)
                        .delay( (d,i) => i * 150 )
                        .ease(d3.easeQuadIn)
                        .style("opacity", 1);
            }

            if( progress <= 0.10 && people_opacity == 1){
                bridge_viz.selectAll(".bridge__people").style("opacity", 0)
                bridge_viz.selectAll(".bridge__people path")
                    .transition()
                    .duration(200)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            }
            break;
        
        case 7:
            conclusion_opacity = d3.selectAll(".step--9__graphic-container > .step--9__graphic").style("opacity");

            if (progress > 0.30 && bridge_opacity == 1){

                bridge_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadOut)
                    .style("opacity", 0);
            } 
            else if ( progress <= 0.30 && bridge_opacity == 0 ){
                bridge_viz
                    .transition()
                    .duration(1000)
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);

                document.body.style.backgroundColor = "#D49861";
            }

            if ( progress > 0.62 && conclusion_opacity == 0 ){
                d3.selectAll(".step--9__graphic-container > .step--9__graphic")
                    .transition()
                    .duration(1000)
                    .delay((d,i) => (1000*i))
                    .ease(d3.easeQuadIn)
                    .style("opacity", 1);
            }

            if ( progress > 0.62 ){
                document.body.style.backgroundColor = "#fff";
            }
            break;

        case 8:
            village_viz.style("opacity", 0);
            bridge_viz.style("opacity", 0);
            break;
    }
}

// helper function called on scroll events to make sure the wrong graphic is not visible
function resetGraphic( index, progress ){
    switch(index){
        case 0:
        case 1:
            if ((village_opacity == 0  && index == 0) || (village_opacity == 0 && index == 1 && progress <=0.66)){
                village_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
            }

            if (bridge_opacity == 1){
                bridge_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 0);
            }
            break;
        
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            if (village_opacity == 1){
                village_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 0);
            }

            if ((bridge_opacity == 0  && index != 7) || (bridge_opacity == 0 && index == 7 && progress <=0.3)){
                bridge_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 1);
            }
            break;
        
        case 2:
        case 8:
            if (village_opacity == 1){
                village_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 0);
            }
            if (bridge_opacity == 1){
                bridge_viz
                    .transition()
                    .duration(100)
                    .style("opacity", 0);
            }
            break;
    }
}

function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            progress: true,
            // debug: true
        })
        .onStepProgress(handleStepProgress);

    village_viz.style("opacity", 1);

    // Hide excluded section at start
    village_viz.select(".excluded").style("opacity", 0); 
    village_viz.select(".excluded_white_border").style("opacity", 0);
    village_viz.select(".excluded_black_border").style("opacity", 0);
    village_viz.select(".excluded_text").style("opacity", 0);

    bridge_viz.style("opacity", 0);

    bridge_viz.selectAll(".bridge__road .bridge__final").style("opacity", 0);
    bridge_viz.selectAll(".bridge__road .bridge__mid").style("opacity", 0);
    bridge_viz.selectAll(".bridge__graphic > .bridge__ends").style("opacity", 0);
    bridge_viz.selectAll(".bridge__ropes").style("opacity", 0);
    bridge_viz.selectAll(".bridge__posts").style("opacity", 0);
    bridge_viz.selectAll(".bridge__people").style("opacity", 0);

    d3.selectAll(".step--9__graphic-container > .step--9__graphic").style("opacity", 0);

}

// kick things off
init();
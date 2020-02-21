import React, { Component } from 'react';
import { loadModules } from 'esri-loader';
import Data from '../../utils/data'


class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            building : []
        }
    }

    // component should only ever render once, and then not update.  
    // all map actions should come via prop changes
    // that trigger esri/arcgis methods inside componentWillReceiveProps
    componentWillUpdate() {
        return false;
    };

    
    componentWillReceiveProps(nextProps) {
   
    };

    homeWidget = (e) => {
       
         this.props.setDashboard("close");
        
    };

    // function to init/load map.  This is called when component mounts
    // map is only ever rendered once
    loadMap() {
        return loadModules(['esri/Map', 'esri/views/MapView', 'esri/Basemap', 'esri/widgets/BasemapGallery', "esri/widgets/BasemapToggle", 'esri/widgets/Search', 'esri/widgets/Home', 'esri/widgets/Expand', 'esri/layers/TileLayer', 'esri/layers/FeatureLayer', "esri/widgets/Legend", "esri/layers/ImageryLayer"])
            .then(([Map, MapView, Basemap, BasemapGallery, BasemapToggle, Search, Home, Expand, TileLayer, FeatureLayer,  Legend,  ImageryLayer]) => {
                
                const topomap = new TileLayer({
                    url: Data.mapUrl,
                });

                const imagery = new TileLayer({
                    url: Data.imageryUrl,
                    minScale: 36112
                });


                const defaultBasemap = new Basemap({
                    baseLayers: [topomap],
                    title: "RARR Basemap ",
                    id: "RARR Basemap"
                });
                
                const map = new Map({
                    basemap: defaultBasemap,
                    //layers: [layer]
                });
                
                const view = new MapView({
                    container: "viewDiv",
                    map: map,
                    center: [-80.840132, 35.225296],
                    zoom: 14,
                    // popup: {
                    //     dockEnabled: true,
                    //     visible: false,
                    //     dockOptions: {
                    //         buttonEnabled: false,
                    //         breakpoint: false,
                    //         position: "auto"
                    //     }
                    // }
                });
                // raster colorize function
                function colorizeRaster(pixelData) {
                  
                    if (
                        pixelData === null ||
                        pixelData.pixelBlock === null ||
                        pixelData.pixelBlock.pixels === null
                    ) {
                        return;
                    }

                    // The pixelBlock stores the values of all pixels visible in the view
                    const pixelBlock = pixelData.pixelBlock;

                    // Get the min and max values of the data in the current view
                    const minValue = pixelBlock.statistics[0].minValue;
                    const maxValue = pixelBlock.statistics[0].maxValue;
                    const pixels = pixelBlock.pixels;
               
                    // The number of pixels in the pixelBlock
                    const numPixels = pixelBlock.width * pixelBlock.height;
                                   
                    const factor = 255.0 / (maxValue - minValue);
                    
                    const depthBand = pixels[0];
                    let rBand = [];
                    let gBand = [];
                    let bBand = [];

                    for (let i = 0; i < numPixels; i++) {
                        let depthValue = depthBand[i];
                        let green = (maxValue - depthValue)* factor ;
                        rBand[i] = green * 0.75;
                        gBand[i] = green;
                        bBand[i] = 255;
                    }

                    pixelData.pixelBlock.pixels = [rBand, gBand, bBand];
                    pixelData.pixelBlock.pixelType = "U8"; // U8 is used for color
                }
                const rasterLayer = new ImageryLayer({
                    
                    url: Data.rasterUrl,
                    pixelFilter: colorizeRaster,
                    opacity: 0.5,
                    id: "rasterInundation",
                });
                map.add(rasterLayer, 0)
                const RARRBuildingsLayer = new FeatureLayer({
                    url: Data.rarrBuildingUrl,
                    visible: true,
                    outFields: ["*"],
                    id: "rarrbuildingsLayer"
                });
                const inundationLayer = new FeatureLayer({
                    url: Data.futureFldPlnUrl,
                    visible: false,
                    outFields: ["*"],
                    opacity: 1
                });
                map.add(RARRBuildingsLayer);
                map.add(inundationLayer, 0)
                const search = new Search({
                    view: view,
                    container: document.createElement("div")
                });

                const bgExpand = new Expand({
                    view: view,
                    content: search
                });
                view.ui.add(bgExpand, "top-left");

                view.ui.move("zoom", "top-left");

                //home customized to close all opend modals and set the zoom level to the intial value
                const homeBtn = new Home({
                    viewModel: {
                        view: view
                    },

                }, "homeWidget");
                view.ui.add(homeBtn, "top-left");

                homeBtn.viewModel.on("go", function (e) {
                   

                });
                
                const basemapGallery = new BasemapGallery({
                    view: view
                });
                // Create an Expand instance and set the content
                const expandBmap = new Expand({
                    expandIconClass: "esri-icon-basemap",
                    view: view,
                    content: basemapGallery
                });
                view.ui.add(expandBmap, "top-left");
                const legend = new Legend({
                    view: view,
                    layerInfos: [
                        {
                            layer: RARRBuildingsLayer,
                            title: "Risk Score"
                        },
                        {
                            layer: rasterLayer,
                            title: "100-yr Future Floodplain"
                        }
                    ]
                });

                const expand = new Expand({
                    expandIconClass: "esri-icon-layer-list",
                    view: view,
                    content: legend
                });
                view.ui.add(expand, "top-left");
                view.on("click", function (evt) {
                    const screenPoint = evt.screenPoint;
                    
                    view.hitTest(evt)
                        .then(getGraphics)
    
                });
    
                const getGraphics = (respose) => {
    
                    const graphic = respose.results[0].graphic;
                    const attributes = graphic.attributes;
                    if(attributes.UnqBldgID) {
                        this.props.setGraphics(attributes)
                        this.props.setDashboard("open");
                    }
                    
                }
                         
                // return () => {
                //     if (view) {
                //         // destroy the map view
                //         view.container = null;
                //     }
                // };
    

                // return components of map that need to respond to user interaction
                let mapReturn = {
                    map: map,
                    mapView: view,
                    mapRARRBuildingsLayer: RARRBuildingsLayer,
                }
                return mapReturn;

            })
    }


    // when component mounts, load map, map return values available to class methods
    // and add click watcher
    componentDidMount() {
        
        this.loadMap()
    }
    
    render() {

        return (
            <div className="mapLayer" >
                <div
                    className="full-screen-map"
                    style={{ width: '100vw', height: '100%' }}
                    id="viewDiv"
                />
                <div id="homeWidget" onClick={this.homeWidget} />
            
            </div>
        )

    }

}
export default Map;
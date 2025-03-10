<template>
    <div v-if="searchArea.length > 0">
        <b-button class="back-button" @click="goBack">Back</b-button>
        <h2>{{ name }}</h2>
        <b-row>
            <b-col offset="1" cols="4">
                <label>Latitude</label>
            </b-col>
            <b-col cols="4">
                <label>Longitude</label>
            </b-col>
        </b-row>
        <div class="container">
            <b-row
                v-for="(coordinate, index) in searchArea"
                :key="index"
                style="margin-bottom: 10px"
            >
                <!-- Input Text field -->
                <b-input-group>
                    <b-col cols="1" class="coordNum">
                        {{ index + 1 }}
                    </b-col>
                    <b-col cols="4">
                        <b-form-input
                            type="text"
                            v-model="coordinate.lat"
                            placeholder="Enter Latitude"
                        ></b-form-input>
                    </b-col>
                    <b-col cols="4">
                        <b-form-input
                            type="text"
                            v-model="coordinate.lng"
                            placeholder="Enter Longitude"
                        ></b-form-input>
                    </b-col>

                    <b-col cols="3">
                        <b-row>
                            <!-- Reset button -->
                            <b-button
                                @click="resetCoordinate(index)"
                                v-show="
                                    index || (!index && searchArea.length > 1)
                                "
                                variant="light"
                                size="sm"
                                class="btn"
                            >
                                <b-icon
                                    icon="arrow-counterclockwise"
                                    variant="primary"
                                    font-scale="1"
                                    aria-label="Delete"
                                ></b-icon>
                            </b-button>

                            <!-- Remove button -->
                            <b-button
                                @click="remove(index)"
                                v-show="
                                    index || (!index && searchArea.length > 1)
                                "
                                variant="light"
                                size="sm"
                                class="btn"
                            >
                                <b-icon
                                    icon="dash-circle"
                                    variant="danger"
                                    font-scale="1"
                                    aria-label="Delete"
                                ></b-icon>
                            </b-button>

                            <!-- Add button -->
                            <b-button
                                @click="add(index)"
                                variant="light"
                                size="sm"
                                class="btn"
                            >
                                <b-icon
                                    icon="plus-circle"
                                    variant="success"
                                    font-scale="1"
                                    aria-label="Add"
                                ></b-icon>
                            </b-button>
                        </b-row>
                    </b-col>
                </b-input-group>
            </b-row>
        </div>
        <b-row class="row" style="float: right; padding-right: 20px">
            <b-button class="button" @click="resetSearchArea">Reset</b-button>
            <b-button
                class="button"
                variant="success"
                :disabled="searchAreaNotChanged() || searchArea.length < 3"
                @click="postSearchArea"
            >
                Submit
            </b-button>
        </b-row>
    </div>
</template>

<script>
import {
    defaultLat,
    defaultLng,
    defaultPolygon,
} from "@/helpers/coordinates.js";
import axios from "axios";

export default {
    props: {
        name: String,
        searchArea: Array,
    },
    data() {
        return {
            initialSearchArea: null,        // Returns null if initialSearchArea is called
        };
    },
    mounted() {     // After mounted, initialSearchArea is set to the searchArea array
        this.initialSearchArea = [...this.searchArea];  
        if (this.searchArea <= 0) {     //If the searchArea is less that or equal to 0 then update the searchArea with the defaultPolygon values
            this.$emit("updateWidgetData", "searchArea", [...defaultPolygon]);
        }
    },
    methods: {
        goBack() {  //Sets searchArea widgetData to the initialSearchArea values
            this.$emit(
                "updateWidgetData",
                "searchArea",
                this.initialSearchArea
            );
            this.$emit("goBack");
        },
        add(index) {  //Adds default coordinates at index+1 in searchArea widgetData 
            let newSearchArea = this.searchArea;
            newSearchArea.splice(index + 1, 0, {
                lat: defaultLat,
                lng: defaultLng,
            });
            this.$emit("updateWidgetData", "searchArea", newSearchArea);
        },
        remove(index) {     // Removes a coordinate at index in searchArea widgetData 
            let newSearchArea = this.searchArea;
            newSearchArea.splice(index, 1);
            this.$emit("updateWidgetData", "searchArea", newSearchArea);
        },
        resetCoordinate(index) {        //Resets coordinate at index to the default coordinate values in searchArea widgetData 
            let newSearchArea = this.searchArea;
            newSearchArea[index] = {
                lat: defaultLat,
                lng: defaultLng,
            };

            this.$emit("updateWidgetData", "searchArea", newSearchArea);
        },
        resetSearchArea() {     // Resets the search area to the default search area in searchArea widgetData 
            let newSearchArea = [...defaultPolygon];
            this.$emit("updateWidgetData", "searchArea", newSearchArea);
        },
        searchAreaNotChanged() {        // Compares initialSearchArea and the current searchArea and returns false if they are not the same
            if (this.searchArea.length != this.initialSearchArea.length) {
                return false;
            }

            for (let i = 0; i < this.searchArea.length; i++) {
                if (
                    this.searchArea[i].lat != this.initialSearchArea[i].lat &&
                    this.searchArea[i].lng != this.initialSearchArea[i].lng
                ) {
                    return false;
                }
            }

            return true;
        },
        postSearchArea() { //Posts data and handles error desponds
            const path = "http://localhost:5000/postSearchArea";
            let payload = {
                search_area: this.searchArea,
            };
            console.log(payload);
            axios
                .post(path, payload)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
            this.$emit("goBack");
        },
    },
};
</script>

<style scoped>
.btn {
    margin-left: 5px;
}
.btn:last-child {
    margin-right: 0px;
}
.back-button {
    position: absolute;
    top: 20px;
    left: 20px;
}

.coordNum {
    padding-top: 7px;
    text-align: right;
}
.container {
    overflow: auto;
    /* height: calc(52vh - 170px); */
    height: 17vh;
}
</style>

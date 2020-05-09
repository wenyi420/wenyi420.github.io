<template>
  <div class="parkmap container">
    <div
      id="map"
      v-show="loadParkingData.length !== 0"
    ></div>
    <div v-show="loadParkingData.length === 0">查無資料</div>
  </div>
</template>

<script>
  import L from "leaflet";

  let openStreetMap = {};
  export default {
    mounted() {
      openStreetMap = L.map("map", {
        center: [22.657409999999999, 120.29949999999999],
        zoom: 18
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20
      }).addTo(openStreetMap);
      this.loadMark();
      console.log("mounted");
    },
    computed: {
      loadParkingData() {
        return this.$store.getters.loadParkingData;
      }
    },
    watch: {
      loadParkingData() {
        this.showMark();
      }
    },
    methods: {
      loadMark() {
        let x = this.loadParkingData[0].latitude;
        let y = this.loadParkingData[0].longitude;
        openStreetMap.setView(new L.LatLng(x, y), 14);

        this.loadParkingData.forEach(pharmacy => {
          L.marker([pharmacy.latitude, pharmacy.longitude]).addTo(openStreetMap)
            .bindPopup(`<p style="margin:10px 0px;"><strong style="font-size: 20px;">${pharmacy.name}</strong></p>
                      類型: ${pharmacy.type}<br>
                      地區: ${pharmacy.area}<br>
                      地址: ${pharmacy.address}<br>
                      電話: ${pharmacy.phone}<br>
                      <small>花費: ${pharmacy.price}</small>`);
        });
      },
      showMark() {
        // clear markers
        openStreetMap.eachLayer(layer => {
          if (layer instanceof L.Marker) {
            openStreetMap.removeLayer(layer);
          }
        });

        this.loadMark();
      }
    }
  };
</script>

<style>
  .parkmap {
    padding: 0 20px 60px;
  }
  #map {
    height: 60vh;
  }
</style>

import { useState } from "react";
import { MapContainer, Popup, GeoJSON } from "react-leaflet";

import "/node_modules/flag-icons/css/flag-icons.min.css";
import "../styles/Map.css";
import { createCountryObj, limitFloats } from "../handle";
import MapData from "../data/custom.geo.json";

const Map = ({ mainAmount, mainCountry, rateList }) => {
  const [countryPopups, setCountryPopups] = useState([]);

  const defaultStyle = {
    fillOpacity: 0.7,
    color: "var(--clr-map-border)",
    fillColor: "var(--clr-map-state)",
    weight: 0.5,
  };

  const clickedStyle = {
    ...defaultStyle,
    fillColor: "var(--clr-primary-5)",
  };

  const mainCountryStyle = {
    ...defaultStyle,
    fillColor: "var(--clr-red)",
  };

  const countryStyle = (feature) => {
    const isMainCountry =
      feature.properties.name_en === mainCountry ||
      feature.properties.name_en.includes(mainCountry);

    const isCountryClicked = countryPopups.find(
      (country) => country.name === feature.properties.name_en
    );

    if (isMainCountry) return mainCountryStyle;
    else if (isCountryClicked) return clickedStyle;
    return defaultStyle;
  };

  const eachCountry = (feature, layer) => {
    if (
      feature.properties.name_en === mainCountry ||
      feature.properties.name_en.includes(mainCountry)
    ) {
      layer.setStyle({ ...mainCountryStyle });
    }

    layer.on("mouseover", () => {
      layer.setStyle({ fillOpacity: 0.4 });
    });

    layer.on("mouseout", () => {
      layer.setStyle({ fillOpacity: 0.7 });
    });

    layer.on("click", async () => {
      const popupObj = await createCountryObj(feature.properties.name_en);

      // Updates the list of clicked countries
      setCountryPopups((prev) => {
        let newPopups;
        prev.some((popup) => popup.name === popupObj.name)
          ? (newPopups = prev.filter((popup) => popup.name !== popupObj.name))
          : (newPopups = [...prev, popupObj]);
        return newPopups;
      });
    });
  };

  return (
    <>
      <MapContainer
        style={{ height: "var(--inner-height)", backgroundColor: "var(--clr-map-bg)" }}
        zoom={3}
        minZoom={2}
        maxZoom={7}
        center={[12.304688, 14.093957]}
        bounds={[
          [-90, -180],
          [90, 180],
        ]}
        maxBounds={[
          [-70, -300],
          [100, 300],
        ]}
      >
        <GeoJSON
          data={MapData.features}
          style={countryStyle}
          onEachFeature={eachCountry}
        />
        {countryPopups.map((country, index) => {
          return (
            <Popup
              className="popup"
              key={index}
              position={country.position}
              autoClose={false}
              closeOnClick={false}
              closeButton={false}
              autoPan={false}
            >
              {
                <>
                  <span
                    className={`fi fi-${country.content.flag.isoCountryCode.toLowerCase()} rect-flag`}
                    title={country.content.flag.description}
                  ></span>

                  <span className="country-name">{country.name}</span>
                  
                  <span className="currency-name">
                    {country.content.currency.name}
                  </span>

                  <div>
                    <span className="rate-span">
                      {limitFloats(
                        rateList[country.content.currency.code] * +mainAmount
                      )}
                    </span>
                    <span className="currency-symbol">
                      {country.content.currency.symbol}
                    </span>
                  </div>
                </>
              }
            </Popup>
          );
        })}
      </MapContainer>
    </>
  );
};

export default Map;

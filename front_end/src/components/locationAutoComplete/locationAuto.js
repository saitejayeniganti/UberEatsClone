import React from "react";
import "./locationAuto.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
  }

  // handleChange = (address) => {
  //   this.setState({ address });
  // };

  // handleSelect = (address) => {
  //   geocodeByAddress(address).then((results) => {
  //     this.setState({ address: address });
  //     getLatLng(results[0])
  //       .then((latLng) => console.log("Success", latLng))
  //       .catch((error) => console.error("Error", error));
  //   });
  // };

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.address}
        onChange={this.props.handleChange}
        onSelect={this.props.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Location",
                className: "location-search-input locationBox",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;

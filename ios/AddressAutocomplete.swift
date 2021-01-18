import MapKit
import Foundation

@objc(AddressAutocomplete)
class AddressAutocomplete: NSObject, MKLocalSearchCompleterDelegate {

    var resolver: RCTPromiseResolveBlock?
    var rejecter: RCTPromiseRejectBlock?
    let completer: MKLocalSearchCompleter = MKLocalSearchCompleter();
    var searchRequest: MKLocalSearch.Request?
    var localSearch: MKLocalSearch?

    override init() {
        super.init()
        completer.delegate = self
    }
    
    @objc(getAddressSuggestions:withResolver:withRejecter:)
    func getAddressSuggestions(address: String!, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            if self.completer.isSearching {
                self.completer.cancel()
            }
            self.completer.queryFragment = address
            self.resolver = resolve
            self.rejecter = reject

            if self.completer.isSearching {
                print("Searching" + address) // Prints
            }
        }
    }

    @objc(getAddressDetails:withResolver:withRejecter:)
    func getAddressDetails(address: String!, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
            if self.localSearch?.isSearching == true {
                print("Canceling request")
                self.localSearch?.cancel()
            }
            self.searchRequest = MKLocalSearch.Request()
            self.searchRequest?.naturalLanguageQuery = address
            self.localSearch = MKLocalSearch(request: self.searchRequest!);
            
            self.localSearch?.start { (response, error) in
                guard let response = response else {
                    print("Error: \(error?.localizedDescription ?? "Unknown error").")
                    self.rejecter?("address_autocomplete", "Unknown error", error)
                    return
                }

                let items = response.mapItems;
                let item = items[0]
                
                let details:[String: Any] = [
                    "title": item.placemark.title! as String,
                    "coordinate": [
                        "longitude": item.placemark.coordinate.longitude as Double,
                        "latitude": item.placemark.coordinate.latitude as Double
                    ],
                    "region": [
                        "longitude": response.boundingRegion.center.longitude as Double,
                        "latitude": response.boundingRegion.center.latitude as Double,
                        "latitudeDelta": response.boundingRegion.span.latitudeDelta,
                        "longitudeDelta": response.boundingRegion.span.longitudeDelta
                    ]
                ]
                
                resolve(details)
            }
        }
    }

    func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
        let results = completer.results.flatMap { (result) -> String? in
            return result.title + " " + result.subtitle
        }
        print(completer.results) // Prints
        self.resolver?(results)
    }

    func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
        self.rejecter?("address_autocomplete", "An error occured", error)
        print(error)
    }

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
}

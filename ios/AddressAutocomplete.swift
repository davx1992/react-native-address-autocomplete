import MapKit
import Foundation

@objc(AddressAutocomplete)
class AddressAutocomplete: NSObject, MKLocalSearchCompleterDelegate {

    var resolver: RCTPromiseResolveBlock?
    var rejecter: RCTPromiseRejectBlock?
    let completer: MKLocalSearchCompleter = MKLocalSearchCompleter();

    override init() {
        super.init()
        completer.delegate = self
    }
    
    @objc(getAddressSuggestions:withResolver:withRejecter:)
    func getAddressSuggestions(address: String!, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        DispatchQueue.main.async {
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
            let searchRequest = MKLocalSearch.Request()
            searchRequest.naturalLanguageQuery = address;
            
            let search = MKLocalSearch(request: searchRequest)
            search.start { (response, error) in
                guard let response = response else {
                    print("Error: \(error?.localizedDescription ?? "Unknown error").")
                    return
                }

                for item in response.mapItems {
                    print(item)
                }
            }
        }
    }

    func completerDidUpdateResults(_ completer: MKLocalSearchCompleter) {
        print("Called") // Prints
        let results = completer.results.flatMap { (result) -> String? in
            return result.title + " " + result.subtitle
        }
        print(completer.results) // Prints
        self.resolver?(results)
    }

    func completer(_ completer: MKLocalSearchCompleter, didFailWithError error: Error) {
        print(error) // Prints
    }

    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
}

export const apiCollectionsData = {
  "1": {
    id: "1",
    name: "GRM API",
    version: "1.0.0",
    status: "active" as const,
    description: "GRM API provides endpoints for authentication, user management, ancillary services, policy management, and more.",
    baseUrl: "https://corporate-test.infinitisoftware.net/sageAdmin/",
    endpoints: [
      {
        id: "fareCheck",
        name: "FareCheck",
        method: "POST",
        path: "/fareCheck",
        description: "Simple fareCheck endpoint to check API availability",
        requests: {
          "200": {
            description: "Success",
            example: `FareCheckRQ:
  MessageHeader:
    RequestID: '12345'
    API_KEY: 5c4b6c6407f45dbc75ca0357a89d271617de965c
    SearchType: O
    AirlineCode:
      - MH
  PassengerTypeQuantity:
    ADT: 3
    CHD: 3
    INF: 3
  ItineraryList:
    OfferPrice:
      TotalAmount: 7224.42
      CurrencyCode: MYR
    FareFamily: BUSBCCMY
    Flights:
      - - SegmentRefID: 'PEN_KUL_MH_1143_2025-11-28T10:50_2025-11-28T11:55'
          FareProductID: 'C_Y#AZBS1YMY/CZBS1YMY/IZBS1YMY'
        - SegmentRefID: 'KUL_MYY_MH_2584_2025-11-28T17:15_2025-11-28T19:50'
          FareProductID: 'C_Y#AZBS1YMY/CZBS1YMY/IZBS1YMY'
            `
          }
        },
        responses: {
          "200": {
            description: "Success",
            example: `FareCheckRS:
  MessageHeader:
    TrackId: 5c4b6c6407f45dbc75ca0357a89d271617de965c
    Status: Success
    Timestamp: '2025-11-18T11:49:02.062446Z'
  ItineraryList:
    OfferPrice:
      TotalAmount: 9836.94
      CurrencyCode: MYR
    FareFamily: BUSBCCMY
    Flights:
      - - SegmentRefID: 'PEN_KUL_MH-1143_2025-11-28T10:50_2025-11-28T11:55'
          FareProductID: 'E_Y#AMSTT/CMSTTCH/IMSTTIN'
        - SegmentRefID: 'KUL_MYY_MH-2584_2025-11-28T17:15_2025-11-28T19:50'
          FareProductID: 'E_Y#AMSTT/CMSTTCH/IMSTTIN'
  OfferPrice:
    TotalAmount: 9836.94
    CurrencyCode: MYR
    BaseAmount: 8931
    Taxes: 905.9399999999999
    Details:
      FareComponent:
        - PassengerType: ADT
          Quantity: 3
          TotalFare: 1639
          BaseAmount: 1488
          Taxes: 151
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
        - PassengerType: CHD
          Quantity: 3
          TotalFare: 1479.09
          BaseAmount: 1340
          Taxes: 139.08999999999997
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
        - PassengerType: INF
          Quantity: 3
          TotalFare: 160.89
          BaseAmount: 149
          Taxes: 11.89
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
      TaxSummary:
        - TaxCode: YQ
          Amount: 24
          Description: Carrier Imposed Fees (YQ)
        - TaxCode: D8
          Amount: 239.97999999999996
          Description: Malaysia Service Tax (D8)
        - TaxCode: H8
          Amount: 2
          Description: ''
        - TaxCode: MY
          Amount: 36
          Description: 'Malaysia: Passenger Service Charge (MY)'`
          }
        }
      },
      {
        id: "flightSearch",
        name: "FlightSearch",
        method: "POST",
        path: "/flightSearch",
        description: "Simple flightSearch endpoint to check API availability",
        requests: {
          "200": {
            description: "Success",
            example: `FlightSearchRQ:
  MessageHeader:
    RequestID: '12345'
    API_KEY: 18F948C9A325377AEF07B2FD
    SearchType: O
    AirlineCode:
      - MH
  Segments:
    - DepartureCode: KUL
      ArrivalCode: PEN
      DepartureDate: '2025-11-28'
  PreferredCabin:
    - E
    - B
    - F
  PassengerTypeQuantity:
    ADT: '1'
    CHD: '1'
    INF: '1'`
          }
        },
        responses: {
          "200": {
            description: "Success",
            example: `FlightSearchRS:
  ResponseHeader:
    Timestamp: '2025-11-17T13:09:52+05:30'
    RequestID: REQ-GENERATED-1763365192
    AirlineCode: MH
  DataLists:
    FlightSegmentList:
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T23:20'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-29T00:20'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1194'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1194'
        SegmentID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T13:50'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T14:50'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1148'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1148'
        SegmentID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T09:05'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T10:05'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1138'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1138'
        SegmentID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T10:50'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T11:50'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1140'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1140'
        SegmentID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T06:40'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T07:45'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5372'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5372'
        SegmentID: 'SZB_PEN_FY_5372_2025-11-28T06:40_2025-11-28T07:45'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T07:20'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T08:25'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5376'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5376'
        SegmentID: 'SZB_PEN_FY_5376_2025-11-28T07:20_2025-11-28T08:25'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T10:10'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T11:15'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5396'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5396'
        SegmentID: 'SZB_PEN_FY_5396_2025-11-28T10:10_2025-11-28T11:15'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T17:30'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T18:35'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5388'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5388'
        SegmentID: 'SZB_PEN_FY_5388_2025-11-28T17:30_2025-11-28T18:35'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T20:55'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T21:55'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1166'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1166'
        SegmentID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T16:45'
          Terminal: '1'
        Arrival:
          AirportCode: KBR
          DateTime: '2025-11-28T17:50'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1396'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1396'
        SegmentID: 'KUL_KBR_MH_1396_2025-11-28T16:45_2025-11-28T17:50'
      - Departure:
          AirportCode: KBR
          DateTime: '2025-11-28T20:20'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T21:20'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5507'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5507'
        SegmentID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T13:00'
          Terminal: '1'
        Arrival:
          AirportCode: KBR
          DateTime: '2025-11-28T14:05'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1426'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1426'
        SegmentID: 'KUL_KBR_MH_1426_2025-11-28T13:00_2025-11-28T14:05'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T08:55'
          Terminal: '1'
        Arrival:
          AirportCode: LGK
          DateTime: '2025-11-28T10:05'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1432'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1432'
        SegmentID: 'KUL_LGK_MH_1432_2025-11-28T08:55_2025-11-28T10:05'
      - Departure:
          AirportCode: LGK
          DateTime: '2025-11-28T12:30'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T13:10'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5295'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5295'
        SegmentID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T13:05'
          Terminal: '1'
        Arrival:
          AirportCode: LGK
          DateTime: '2025-11-28T14:10'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1436'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1436'
        SegmentID: 'KUL_LGK_MH_1436_2025-11-28T13:05_2025-11-28T14:10'
      - Departure:
          AirportCode: LGK
          DateTime: '2025-11-28T18:35'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T19:15'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '4743'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '4743'
        SegmentID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T11:45'
          Terminal: '1'
        Arrival:
          AirportCode: LGK
          DateTime: '2025-11-28T12:55'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1438'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1438'
        SegmentID: 'KUL_LGK_MH_1438_2025-11-28T11:45_2025-11-28T12:55'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T13:30'
          Terminal: ''
        Arrival:
          AirportCode: LGK
          DateTime: '2025-11-28T14:50'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5360'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5360'
        SegmentID: 'SZB_LGK_FY_5360_2025-11-28T13:30_2025-11-28T14:50'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T14:00'
          Terminal: ''
        Arrival:
          AirportCode: KBR
          DateTime: '2025-11-28T15:10'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5312'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5312'
        SegmentID: 'SZB_KBR_FY_5312_2025-11-28T14:00_2025-11-28T15:10'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T10:00'
          Terminal: ''
        Arrival:
          AirportCode: LGK
          DateTime: '2025-11-28T11:20'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5362'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5362'
        SegmentID: 'SZB_LGK_FY_5362_2025-11-28T10:00_2025-11-28T11:20'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T21:00'
          Terminal: ''
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T22:05'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5398'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5398'
        SegmentID: 'SZB_PEN_FY_5398_2025-11-28T21:00_2025-11-28T22:05'
      - Departure:
          AirportCode: SZB
          DateTime: '2025-11-28T16:00'
          Terminal: ''
        Arrival:
          AirportCode: KBR
          DateTime: '2025-11-28T17:10'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '5318'
        OperatingCarrier:
          AirlineID: FY
          FlightNumber: '5318'
        SegmentID: 'SZB_KBR_FY_5318_2025-11-28T16:00_2025-11-28T17:10'
      - Departure:
          AirportCode: KUL
          DateTime: '2025-11-28T18:50'
          Terminal: '1'
        Arrival:
          AirportCode: PEN
          DateTime: '2025-11-28T19:50'
          Terminal: ''
        MarketingCarrier:
          AirlineID: MH
          FlightNumber: '1162'
        OperatingCarrier:
          AirlineID: MH
          FlightNumber: '1162'
        SegmentID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
    FareProductList:
      - FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#AOMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - OMHFY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 86.52
            Tax: 0
            TotalAmount: 86.52
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#COMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - OMHFY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 77.83
            Tax: 0
            TotalAmount: 77.83
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IOMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - OMHFY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 6.45
            Tax: 0
            TotalAmount: 6.45
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QMHFY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 93
            Tax: 0
            TotalAmount: 93
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QMHFY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 83.24
            Tax: 0
            TotalAmount: 83.24
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QMHFY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 7.5
            Tax: 0
            TotalAmount: 7.5
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NMHFY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 105.94
            Tax: 0
            TotalAmount: 105.94
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NMHFY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 94.04
            Tax: 0
            TotalAmount: 94.04
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NMHFY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 8.59
            Tax: 0
            TotalAmount: 8.59
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AOLTLGOMY/COLTLGOMY/IOLTLGOMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#AOLTLGOMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - OLTLGOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 104.81
            Tax: 0
            TotalAmount: 104.81
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#COLTLGOMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - OLTLGOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 96.22
            Tax: 0
            TotalAmount: 96.22
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IOLTLGOMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - OLTLGOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 8.58
            Tax: 0
            TotalAmount: 8.58
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AOLTBXOMY/COLTBXOMY/IOLTBXOMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#AOLTBXOMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - OLTBXOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 125.33
            Tax: 0
            TotalAmount: 125.33
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#COLTBXOMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - OLTBXOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 110.22
            Tax: 0
            TotalAmount: 110.22
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IOLTBXOMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - OLTBXOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 10.73
            Tax: 0
            TotalAmount: 10.73
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQLGOWMY/CQLGOWMY/IQLGOWMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQLGOWMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLGOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 131.88
            Tax: 0
            TotalAmount: 131.88
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQLGOWMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLGOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 122.08
            Tax: 0
            TotalAmount: 122.08
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQLGOWMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLGOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 10.79
            Tax: 0
            TotalAmount: 10.79
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQBXOWMY/CQBXOWMY/IQBXOWMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQBXOWMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBXOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 151.32
            Tax: 0
            TotalAmount: 151.32
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQBXOWMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBXOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 132.91
            Tax: 0
            TotalAmount: 132.91
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQBXOWMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBXOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 12.93
            Tax: 0
            TotalAmount: 12.93
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANLGOWMY/CNLGOWMY/INLGOWMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANLGOWMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLGOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 153.48
            Tax: 0
            TotalAmount: 153.48
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNLGOWMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLGOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 141.52
            Tax: 0
            TotalAmount: 141.52
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INLGOWMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLGOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 12.95
            Tax: 0
            TotalAmount: 12.95
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANBXOWMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - NBXOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 171.84
            Tax: 0
            TotalAmount: 171.84
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNBXOWMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - NBXOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 150.2
            Tax: 0
            TotalAmount: 150.2
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INBXOWMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - NBXOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 15.08
            Tax: 0
            TotalAmount: 15.08
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ALMHFY/CLMHFY/ILMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#ALMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - LMHFY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 182.58
            Tax: 0
            TotalAmount: 182.58
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CLMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - LMHFY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 158.84
            Tax: 0
            TotalAmount: 158.84
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#ILMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - LMHFY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 16.16
            Tax: 0
            TotalAmount: 16.16
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AOLTFLOMY/COLTFLOMY/IOLTFLOMY'
        FareFamilyRefID: ECOFLXXYMY
        PassengerFares:
          - PaxFareID: 'M_Y#AOLTFLOMY'
            PassengerType: ADT
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - OLTFLOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 196.65
            Tax: 0
            TotalAmount: 196.65
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#COLTFLOMY'
            PassengerType: CHD
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - OLTFLOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 153.47
            Tax: 0
            TotalAmount: 153.47
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IOLTFLOMY'
            PassengerType: INF
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - OLTFLOMY
            RBD:
              - O
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 17.26
            Tax: 0
            TotalAmount: 17.26
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQFLOWMY/CQFLOWMY/IQFLOWMY'
        FareFamilyRefID: ECOFLXXYMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQFLOWMY'
            PassengerType: ADT
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - QFLOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 219.36
            Tax: 0
            TotalAmount: 219.36
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQFLOWMY'
            PassengerType: CHD
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - QFLOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 170.76
            Tax: 0
            TotalAmount: 170.76
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQFLOWMY'
            PassengerType: INF
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - QFLOWMY
            RBD:
              - Q
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 19.44
            Tax: 0
            TotalAmount: 19.44
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQLG1YMY/CQLG1YMY/IQLG1YMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQLG1YMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLG1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 216.56
            Tax: 0
            TotalAmount: 216.56
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQLG1YMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLG1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 193.91
            Tax: 0
            TotalAmount: 193.91
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQLG1YMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - QLG1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 18.35
            Tax: 0
            TotalAmount: 18.35
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
        FareFamilyRefID: ECOFLXXYMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANFLOWMY'
            PassengerType: ADT
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - NFLOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 236.6
            Tax: 0
            TotalAmount: 236.6
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNFLOWMY'
            PassengerType: CHD
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - NFLOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 183.68
            Tax: 0
            TotalAmount: 183.68
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INFLOWMY'
            PassengerType: INF
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - NFLOWMY
            RBD:
              - 'N'
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 21.56
            Tax: 0
            TotalAmount: 21.56
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQBX1YMY/CQBX1YMY/IQBX1YMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQBX1YMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBX1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 236
            Tax: 0
            TotalAmount: 236
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQBX1YMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBX1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 204.74
            Tax: 0
            TotalAmount: 204.74
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQBX1YMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - QBX1YMY
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 20.49
            Tax: 0
            TotalAmount: 20.49
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANLG1YMY/CNLG1YMY/INLG1YMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANLG1YMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLG1YMY
              - OMHFY
            RBD:
              - 'N'
              - O
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 242.49
            Tax: 0
            TotalAmount: 242.49
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNLG1YMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLG1YMY
              - OMHFY
            RBD:
              - 'N'
              - O
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 216.56
            Tax: 0
            TotalAmount: 216.56
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INLG1YMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - NLG1YMY
              - OMHFY
            RBD:
              - 'N'
              - O
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 21.54
            Tax: 0
            TotalAmount: 21.54
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ASMHFY/CSMHFY/ISMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#ASMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - SMHFY
              - QMHFY
            RBD:
              - S
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 274.94
            Tax: 0
            TotalAmount: 274.94
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CSMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - SMHFY
              - QMHFY
            RBD:
              - S
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 239.25
            Tax: 0
            TotalAmount: 239.25
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#ISMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - SMHFY
              - QMHFY
            RBD:
              - S
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 24.79
            Tax: 0
            TotalAmount: 24.79
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AMMHFY/CMMHFY/IMMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#AMMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - MMHFY
            RBD:
              - M
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 275.52
            Tax: 0
            TotalAmount: 275.52
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CMMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - MMHFY
            RBD:
              - M
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 238.73
            Tax: 0
            TotalAmount: 238.73
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IMMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - MMHFY
            RBD:
              - M
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 25.85
            Tax: 0
            TotalAmount: 25.85
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ALLGOWMY/CLLGOWMY/ILLGOWMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#ALLGOWMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - LLGOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 300.36
            Tax: 0
            TotalAmount: 300.36
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CLLGOWMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - LLGOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 273.32
            Tax: 0
            TotalAmount: 273.32
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#ILLGOWMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - LLGOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 28.04
            Tax: 0
            TotalAmount: 28.04
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ALBXOWMY/CLBXOWMY/ILBXOWMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#ALBXOWMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - LBXOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 318.72
            Tax: 0
            TotalAmount: 318.72
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CLBXOWMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - LBXOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 275.45
            Tax: 0
            TotalAmount: 275.45
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#ILBXOWMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - LBXOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 30.17
            Tax: 0
            TotalAmount: 30.17
            CurrencyCode: MYR
      - FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        FareFamilyRefID: BUSBCCMY
        PassengerFares:
          - PaxFareID: 'C_Y#AZBTOWMY'
            PassengerType: ADT
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - ZBTOWMY
            RBD:
              - Z
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 333.8
            Tax: 0
            TotalAmount: 333.8
            CurrencyCode: MYR
          - PaxFareID: 'C_Y#CZBTOWMY'
            PassengerType: CHD
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - ZBTOWMY
            RBD:
              - Z
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 289.49
            Tax: 0
            TotalAmount: 289.49
            CurrencyCode: MYR
          - PaxFareID: 'C_Y#IZBTOWMY'
            PassengerType: INF
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - ZBTOWMY
            RBD:
              - Z
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 30.2
            Tax: 0
            TotalAmount: 30.2
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ALFLOWMY/CLFLOWMY/ILFLOWMY'
        FareFamilyRefID: ECOFLXXYMY
        PassengerFares:
          - PaxFareID: 'M_Y#ALFLOWMY'
            PassengerType: ADT
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - LFLOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 383.48
            Tax: 0
            TotalAmount: 383.48
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CLFLOWMY'
            PassengerType: CHD
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - LFLOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 293.84
            Tax: 0
            TotalAmount: 293.84
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#ILFLOWMY'
            PassengerType: INF
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - LFLOWMY
            RBD:
              - L
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 36.65
            Tax: 0
            TotalAmount: 36.65
            CurrencyCode: MYR
      - FareProductID: 'M_Y#AQSTT/CQSTT/IQSTT'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#AQSTT'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QSTT
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 362.44
            Tax: 0
            TotalAmount: 362.44
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CQSTT'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QSTT
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 338.62
            Tax: 0
            TotalAmount: 338.62
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IQSTT'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - QSTT
              - QMHFY
            RBD:
              - Q
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 78.81
            Tax: 0
            TotalAmount: 78.81
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ABMHFY/CBMHFY/IBMHFY'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#ABMHFY'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - BMHFY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 411.58
            Tax: 0
            TotalAmount: 411.58
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CBMHFY'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - BMHFY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 354.29
            Tax: 0
            TotalAmount: 354.29
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IBMHFY'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - BMHFY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 38.86
            Tax: 0
            TotalAmount: 38.86
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ANSTT/CNSTT/INSTT'
        FareFamilyRefID: ECOCSDMY
        PassengerFares:
          - PaxFareID: 'M_Y#ANSTT'
            PassengerType: ADT
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NSTT
              - QMHFY
            RBD:
              - 'N'
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 417.52
            Tax: 0
            TotalAmount: 417.52
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CNSTT'
            PassengerType: CHD
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NSTT
              - QMHFY
            RBD:
              - 'N'
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 388.29
            Tax: 0
            TotalAmount: 388.29
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#INSTT'
            PassengerType: INF
            FareProductCode: ECOCSDMY
            FareBasisCode:
              - NSTT
              - QMHFY
            RBD:
              - 'N'
              - Q
            BreakPoint:
              - 'Y'
              - 'Y'
            CabinClass:
              - M
              - M
            BaseFare: 84.22
            Tax: 0
            TotalAmount: 84.22
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ABBXOWMY/CBBXOWMY/IBBXOWMY'
        FareFamilyRefID: ECOBASEKMY
        PassengerFares:
          - PaxFareID: 'M_Y#ABBXOWMY'
            PassengerType: ADT
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - BBXOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 869.52
            Tax: 0
            TotalAmount: 869.52
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CBBXOWMY'
            PassengerType: CHD
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - BBXOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 743.13
            Tax: 0
            TotalAmount: 743.13
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IBBXOWMY'
            PassengerType: INF
            FareProductCode: ECOBASEKMY
            FareBasisCode:
              - BBXOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 85.25
            Tax: 0
            TotalAmount: 85.25
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ABLGOWMY/CBLGOWMY/IBLGOWMY'
        FareFamilyRefID: ECOLETIMY
        PassengerFares:
          - PaxFareID: 'M_Y#ABLGOWMY'
            PassengerType: ADT
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - BLGOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 851.16
            Tax: 0
            TotalAmount: 851.16
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CBLGOWMY'
            PassengerType: CHD
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - BLGOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 769.04
            Tax: 0
            TotalAmount: 769.04
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IBLGOWMY'
            PassengerType: INF
            FareProductCode: ECOLETIMY
            FareBasisCode:
              - BLGOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 83.12
            Tax: 0
            TotalAmount: 83.12
            CurrencyCode: MYR
      - FareProductID: 'M_Y#ABFLOWMY/CBFLOWMY/IBFLOWMY'
        FareFamilyRefID: ECOFLXXYMY
        PassengerFares:
          - PaxFareID: 'M_Y#ABFLOWMY'
            PassengerType: ADT
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - BFLOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 934.28
            Tax: 0
            TotalAmount: 934.28
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#CBFLOWMY'
            PassengerType: CHD
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - BFLOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 707.44
            Tax: 0
            TotalAmount: 707.44
            CurrencyCode: MYR
          - PaxFareID: 'M_Y#IBFLOWMY'
            PassengerType: INF
            FareProductCode: ECOFLXXYMY
            FareBasisCode:
              - BFLOWMY
            RBD:
              - B
            BreakPoint:
              - 'Y'
            CabinClass:
              - M
            BaseFare: 91.73
            Tax: 0
            TotalAmount: 91.73
            CurrencyCode: MYR
      - FareProductID: 'C_Y#ADBSOWMY/CDBSOWMY/IDBSOWMY'
        FareFamilyRefID: BUSBCCMY
        PassengerFares:
          - PaxFareID: 'C_Y#ADBSOWMY'
            PassengerType: ADT
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - DBSOWMY
            RBD:
              - D
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 904.02
            Tax: 0
            TotalAmount: 904.02
            CurrencyCode: MYR
          - PaxFareID: 'C_Y#CDBSOWMY'
            PassengerType: CHD
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - DBSOWMY
            RBD:
              - D
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 773.38
            Tax: 0
            TotalAmount: 773.38
            CurrencyCode: MYR
          - PaxFareID: 'C_Y#IDBSOWMY'
            PassengerType: INF
            FareProductCode: BUSBCCMY
            FareBasisCode:
              - DBSOWMY
            RBD:
              - D
            BreakPoint:
              - 'Y'
            CabinClass:
              - C
            BaseFare: 87.42
            Tax: 0
            TotalAmount: 87.42
            CurrencyCode: MYR
    FareFamilyList:
      - FareFamilyID: ECOCSDMY
        FareProductCode: ECOCSDMY
        fareFamilyReference: '1'
        CabinClass: Economy
        Name: Economy Codeshare
        benefits:
          BaggageAllowance: Baggage Weight varies on operating carrier
          Refunds: Refund varies
          Exchange: Rebooking fee varies
      - FareFamilyID: ECOLETIMY
        FareProductCode: ECOLETIMY
        fareFamilyReference: '2'
        CabinClass: Economy
        Name: Economy Lite
        benefits:
          BaggageAllowance: Check-in Baggage 10 kg
          Refunds: Refund not available
          Exchange: Rebooking at a fee + fare difference
      - FareFamilyID: ECOBASEKMY
        FareProductCode: ECOBASEKMY
        fareFamilyReference: '3'
        CabinClass: Economy
        Name: Economy Basic
        benefits:
          BaggageAllowance: Check-in Baggage 20 kg
          Refunds: Refund at a fee
          Exchange: 'Rebooking: 1x Free change fee (fare difference applies)'
      - FareFamilyID: ECOFLXXYMY
        FareProductCode: ECOFLXXYMY
        fareFamilyReference: '4'
        CabinClass: Economy
        Name: Economy Flex
        benefits:
          BaggageAllowance: Check-in Baggage 35 kg
          Refunds: Refund without a fee
          Exchange: 'Rebooking: Unlimited free change (fare difference applies)'
      - FareFamilyID: BUSBCCMY
        FareProductCode: BUSBCCMY
        fareFamilyReference: '5'
        CabinClass: Business
        Name: Business Basic
        benefits:
          BaggageAllowance: Check-in Baggage 40 kg
          Refunds: Refund at a fee
          Exchange: 'Rebooking: 1x Free change fee (fare difference applies)'
  PricedOffers:
    - OfferID: OFFER-1
      OfferPrice:
        TotalAmount: 170.8
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-2
      OfferPrice:
        TotalAmount: 183.74
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-3
      OfferPrice:
        TotalAmount: 208.57
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        - []
    - OfferID: OFFER-4
      OfferPrice:
        TotalAmount: 208.57
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        - []
    - OfferID: OFFER-5
      OfferPrice:
        TotalAmount: 209.61
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
            FareProductID: 'M_Y#AOLTLGOMY/COLTLGOMY/IOLTLGOMY'
        - []
    - OfferID: OFFER-6
      OfferPrice:
        TotalAmount: 246.28
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
            FareProductID: 'M_Y#AOLTBXOMY/COLTBXOMY/IOLTBXOMY'
        - []
    - OfferID: OFFER-7
      OfferPrice:
        TotalAmount: 264.75
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
            FareProductID: 'M_Y#AQLGOWMY/CQLGOWMY/IQLGOWMY'
        - []
    - OfferID: OFFER-8
      OfferPrice:
        TotalAmount: 297.16
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
            FareProductID: 'M_Y#AQBXOWMY/CQBXOWMY/IQBXOWMY'
        - []
    - OfferID: OFFER-9
      OfferPrice:
        TotalAmount: 304.72
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_PEN_FY_5372_2025-11-28T06:40_2025-11-28T07:45'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-10
      OfferPrice:
        TotalAmount: 307.95
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
            FareProductID: 'M_Y#ANLGOWMY/CNLGOWMY/INLGOWMY'
        - []
    - OfferID: OFFER-11
      OfferPrice:
        TotalAmount: 307.95
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
            FareProductID: 'M_Y#ANLGOWMY/CNLGOWMY/INLGOWMY'
        - []
    - OfferID: OFFER-12
      OfferPrice:
        TotalAmount: 324.2
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_PEN_FY_5376_2025-11-28T07:20_2025-11-28T08:25'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        - []
    - OfferID: OFFER-13
      OfferPrice:
        TotalAmount: 324.2
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_PEN_FY_5396_2025-11-28T10:10_2025-11-28T11:15'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        - []
    - OfferID: OFFER-14
      OfferPrice:
        TotalAmount: 324.2
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_PEN_FY_5388_2025-11-28T17:30_2025-11-28T18:35'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
        - []
    - OfferID: OFFER-15
      OfferPrice:
        TotalAmount: 337.12
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
            FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
        - []
    - OfferID: OFFER-16
      OfferPrice:
        TotalAmount: 337.12
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
            FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
        - []
    - OfferID: OFFER-17
      OfferPrice:
        TotalAmount: 357.58
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
            FareProductID: 'M_Y#ALMHFY/CLMHFY/ILMHFY'
        - []
    - OfferID: OFFER-18
      OfferPrice:
        TotalAmount: 367.38
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
            FareProductID: 'M_Y#AOLTFLOMY/COLTFLOMY/IOLTFLOMY'
        - []
    - OfferID: OFFER-19
      OfferPrice:
        TotalAmount: 409.56
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
            FareProductID: 'M_Y#AQFLOWMY/CQFLOWMY/IQFLOWMY'
        - []
    - OfferID: OFFER-20
      OfferPrice:
        TotalAmount: 415.93
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1396_2025-11-28T16:45_2025-11-28T17:50'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-21
      OfferPrice:
        TotalAmount: 415.93
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1426_2025-11-28T13:00_2025-11-28T14:05'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-22
      OfferPrice:
        TotalAmount: 428.82
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1432_2025-11-28T08:55_2025-11-28T10:05'
            FareProductID: 'M_Y#AQLG1YMY/CQLG1YMY/IQLG1YMY'
          - SegmentRefID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-23
      OfferPrice:
        TotalAmount: 428.82
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1436_2025-11-28T13:05_2025-11-28T14:10'
            FareProductID: 'M_Y#AQLG1YMY/CQLG1YMY/IQLG1YMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-24
      OfferPrice:
        TotalAmount: 441.84
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
            FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
        - []
    - OfferID: OFFER-25
      OfferPrice:
        TotalAmount: 441.84
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
            FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
        - []
    - OfferID: OFFER-26
      OfferPrice:
        TotalAmount: 461.23
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1432_2025-11-28T08:55_2025-11-28T10:05'
            FareProductID: 'M_Y#AQBX1YMY/CQBX1YMY/IQBX1YMY'
          - SegmentRefID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-27
      OfferPrice:
        TotalAmount: 461.23
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1436_2025-11-28T13:05_2025-11-28T14:10'
            FareProductID: 'M_Y#AQBX1YMY/CQBX1YMY/IQBX1YMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-28
      OfferPrice:
        TotalAmount: 472.02
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1438_2025-11-28T11:45_2025-11-28T12:55'
            FareProductID: 'M_Y#ANLGOWMY/CNLGOWMY/INLGOWMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-29
      OfferPrice:
        TotalAmount: 480.59
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1396_2025-11-28T16:45_2025-11-28T17:50'
            FareProductID: 'M_Y#ANLG1YMY/CNLG1YMY/INLG1YMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-30
      OfferPrice:
        TotalAmount: 480.59
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1426_2025-11-28T13:00_2025-11-28T14:05'
            FareProductID: 'M_Y#ANLG1YMY/CNLG1YMY/INLG1YMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-31
      OfferPrice:
        TotalAmount: 489.27
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_LGK_FY_5360_2025-11-28T13:30_2025-11-28T14:50'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-32
      OfferPrice:
        TotalAmount: 501.19
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1438_2025-11-28T11:45_2025-11-28T12:55'
            FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-33
      OfferPrice:
        TotalAmount: 510.84
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1396_2025-11-28T16:45_2025-11-28T17:50'
            FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-34
      OfferPrice:
        TotalAmount: 510.84
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1426_2025-11-28T13:00_2025-11-28T14:05'
            FareProductID: 'M_Y#ANBXOWMY/CNBXOWMY/INBXOWMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-35
      OfferPrice:
        TotalAmount: 533.56
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_KBR_FY_5312_2025-11-28T14:00_2025-11-28T15:10'
            FareProductID: 'M_Y#ANMHFY/CNMHFY/INMHFY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-36
      OfferPrice:
        TotalAmount: 538.98
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_LGK_FY_5362_2025-11-28T10:00_2025-11-28T11:20'
            FareProductID: 'M_Y#ASMHFY/CSMHFY/ISMHFY'
          - SegmentRefID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-37
      OfferPrice:
        TotalAmount: 540.1
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_PEN_FY_5398_2025-11-28T21:00_2025-11-28T22:05'
            FareProductID: 'M_Y#AMMHFY/CMMHFY/IMMHFY'
        - []
    - OfferID: OFFER-38
      OfferPrice:
        TotalAmount: 575.63
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1432_2025-11-28T08:55_2025-11-28T10:05'
            FareProductID: 'M_Y#AQFLOWMY/CQFLOWMY/IQFLOWMY'
          - SegmentRefID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-39
      OfferPrice:
        TotalAmount: 575.63
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1436_2025-11-28T13:05_2025-11-28T14:10'
            FareProductID: 'M_Y#AQFLOWMY/CQFLOWMY/IQFLOWMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-40
      OfferPrice:
        TotalAmount: 582.27
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'SZB_KBR_FY_5318_2025-11-28T16:00_2025-11-28T17:10'
            FareProductID: 'M_Y#ASMHFY/CSMHFY/ISMHFY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-41
      OfferPrice:
        TotalAmount: 601.72
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
            FareProductID: 'M_Y#ALLGOWMY/CLLGOWMY/ILLGOWMY'
        - []
    - OfferID: OFFER-42
      OfferPrice:
        TotalAmount: 604.91
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1438_2025-11-28T11:45_2025-11-28T12:55'
            FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-43
      OfferPrice:
        TotalAmount: 615.68
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1396_2025-11-28T16:45_2025-11-28T17:50'
            FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-44
      OfferPrice:
        TotalAmount: 615.68
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_KBR_MH_1426_2025-11-28T13:00_2025-11-28T14:05'
            FareProductID: 'M_Y#ANFLOWMY/CNFLOWMY/INFLOWMY'
          - SegmentRefID: 'KBR_PEN_FY_5507_2025-11-28T20:20_2025-11-28T21:20'
            FareProductID: 'M_Y#AOMHFY/COMHFY/IOMHFY'
        - []
    - OfferID: OFFER-45
      OfferPrice:
        TotalAmount: 624.34
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
            FareProductID: 'M_Y#ALBXOWMY/CLBXOWMY/ILBXOWMY'
        - []
    - OfferID: OFFER-46
      OfferPrice:
        TotalAmount: 653.49
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1140_2025-11-28T10:50_2025-11-28T11:50'
            FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        - []
    - OfferID: OFFER-47
      OfferPrice:
        TotalAmount: 653.49
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1148_2025-11-28T13:50_2025-11-28T14:50'
            FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        - []
    - OfferID: OFFER-48
      OfferPrice:
        TotalAmount: 653.49
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
            FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        - []
    - OfferID: OFFER-49
      OfferPrice:
        TotalAmount: 653.49
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
            FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        - []
    - OfferID: OFFER-50
      OfferPrice:
        TotalAmount: 653.49
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1194_2025-11-28T23:20_2025-11-29T00:20'
            FareProductID: 'C_Y#AZBTOWMY/CZBTOWMY/IZBTOWMY'
        - []
    - OfferID: OFFER-51
      OfferPrice:
        TotalAmount: 713.97
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1166_2025-11-28T20:55_2025-11-28T21:55'
            FareProductID: 'M_Y#ALFLOWMY/CLFLOWMY/ILFLOWMY'
        - []
    - OfferID: OFFER-52
      OfferPrice:
        TotalAmount: 779.87
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1432_2025-11-28T08:55_2025-11-28T10:05'
            FareProductID: 'M_Y#AQSTT/CQSTT/IQSTT'
          - SegmentRefID: 'LGK_PEN_FY_5295_2025-11-28T12:30_2025-11-28T13:10'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-53
      OfferPrice:
        TotalAmount: 779.87
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1436_2025-11-28T13:05_2025-11-28T14:10'
            FareProductID: 'M_Y#AQSTT/CQSTT/IQSTT'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-54
      OfferPrice:
        TotalAmount: 804.73
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
            FareProductID: 'M_Y#ABMHFY/CBMHFY/IBMHFY'
        - []
    - OfferID: OFFER-55
      OfferPrice:
        TotalAmount: 890.03
        CurrencyCode: MYR
      FareFamilyID: ECOCSDMY
      Flights:
        - - SegmentRefID: 'KUL_LGK_MH_1438_2025-11-28T11:45_2025-11-28T12:55'
            FareProductID: 'M_Y#ANSTT/CNSTT/INSTT'
          - SegmentRefID: 'LGK_PEN_FY_4743_2025-11-28T18:35_2025-11-28T19:15'
            FareProductID: 'M_Y#AQMHFY/CQMHFY/IQMHFY'
        - []
    - OfferID: OFFER-56
      OfferPrice:
        TotalAmount: 1697.9
        CurrencyCode: MYR
      FareFamilyID: ECOBASEKMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
            FareProductID: 'M_Y#ABBXOWMY/CBBXOWMY/IBBXOWMY'
        - []
    - OfferID: OFFER-57
      OfferPrice:
        TotalAmount: 1703.32
        CurrencyCode: MYR
      FareFamilyID: ECOLETIMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
            FareProductID: 'M_Y#ABLGOWMY/CBLGOWMY/IBLGOWMY'
        - []
    - OfferID: OFFER-58
      OfferPrice:
        TotalAmount: 1733.45
        CurrencyCode: MYR
      FareFamilyID: ECOFLXXYMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1162_2025-11-28T18:50_2025-11-28T19:50'
            FareProductID: 'M_Y#ABFLOWMY/CBFLOWMY/IBFLOWMY'
        - []FareCheckRS:
  MessageHeader:
    TrackId: 5c4b6c6407f45dbc75ca0357a89d271617de965c
    Status: Success
    Timestamp: '2025-11-18T11:49:02.062446Z'
  ItineraryList:
    OfferPrice:
      TotalAmount: 9836.94
      CurrencyCode: MYR
    FareFamily: BUSBCCMY
    Flights:
      - - SegmentRefID: 'PEN_KUL_MH-1143_2025-11-28T10:50_2025-11-28T11:55'
          FareProductID: 'E_Y#AMSTT/CMSTTCH/IMSTTIN'
        - SegmentRefID: 'KUL_MYY_MH-2584_2025-11-28T17:15_2025-11-28T19:50'
          FareProductID: 'E_Y#AMSTT/CMSTTCH/IMSTTIN'
  OfferPrice:
    TotalAmount: 9836.94
    CurrencyCode: MYR
    BaseAmount: 8931
    Taxes: 905.9399999999999
    Details:
      FareComponent:
        - PassengerType: ADT
          Quantity: 3
          TotalFare: 1639
          BaseAmount: 1488
          Taxes: 151
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
        - PassengerType: CHD
          Quantity: 3
          TotalFare: 1479.09
          BaseAmount: 1340
          Taxes: 139.08999999999997
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
        - PassengerType: INF
          Quantity: 3
          TotalFare: 160.89
          BaseAmount: 149
          Taxes: 11.89
          CurrencyCode: MYR
          FareBasisCode: QFLOWMY
          RBD: Q
      TaxSummary:
        - TaxCode: YQ
          Amount: 24
          Description: Carrier Imposed Fees (YQ)
        - TaxCode: D8
          Amount: 239.97999999999996
          Description: Malaysia Service Tax (D8)
        - TaxCode: H8
          Amount: 2
          Description: ''
        - TaxCode: MY
          Amount: 36
          Description: 'Malaysia: Passenger Service Charge (MY)'
    - OfferID: OFFER-59
      OfferPrice:
        TotalAmount: 1764.82
        CurrencyCode: MYR
      FareFamilyID: BUSBCCMY
      Flights:
        - - SegmentRefID: 'KUL_PEN_MH_1138_2025-11-28T09:05_2025-11-28T10:05'
            FareProductID: 'C_Y#ADBSOWMY/CDBSOWMY/IDBSOWMY'
        - []`
          }
        }
      },
      {
        id: "GetAncillary",
        name: "GetAncillary",
        method: "POST",
        path: "/getAncillary",
        description: "Simple GetAncillary endpoint to check API availability",
        requests: {
          "200": {
            description: "Success",
            example: `GetAncillaryRQ:
  MessageHeader:
    RequestID: ANCILLARY-REQ-7868
    API_KEY: 5c4b6c6407f45dbc75ca0357a89d271617de965c
  OrderDetails:
    PNR: F95L3X
    OrderID: '7800'
  AncillaryFilter:
    - BAGGAGE
    - SEAT
    - MEAL
  DataList:
    PassengerTypeQuantity:
      - ADT: 1
        CHD: 0
        INF: 0
    ItineraryList:
      OfferPrice:
        TotalAmount: 531.48
        CurrencyCode: MYR
      FareFamily: ECOCSDMY
      Flights:
        - - SegmentRefID: 'PEN_KUL_MH-1137_2025-11-28T05:50_2025-11-28T06:55'
            FareProductID: 'M_Y#AOMHFY'
          - SegmentRefID: 'KUL_MYY_MH-2574_2025-11-28T09:00_2025-11-28T11:25'
            FareProductID: 'M_Y#AOMHFY'
        - - SegmentRefID: 'MYY_KUL_MH-2593_2025-12-28T17:30_2025-12-28T19:55'
            FareProductID: 'M_Y#ANLG1YMY'
          - SegmentRefID: 'KUL_PEN_MH-1166_2025-12-28T20:55_2025-12-28T21:55'
            FareProductID: 'M_Y#ANLG1YMY'`
          }
        },
        responses: {
          "200": {
            description: "Success",
            example: `GetAncillaryRS:
  MessageHeader:
    Status: Success
    Timestamp: '2025-11-21T05:12:04.938692'
    RequestID: ANCILLARY-REQ-7868
    AirlineCode: ''
  DataList:
    AncillaryList:
      - ancillary_type: SPECIAL_ASSISTANCE
        ancillary_name: Special Assistance
        services:
          - ServiceID: DEAF
            ServiceName: Hearing and/or Speech Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 0
          - ServiceID: BLND
            ServiceName: Visually Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 1
          - ServiceID: WCHR
            ServiceName: Wheelchair
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 2
          - ServiceID: DEAF
            ServiceName: Hearing and/or Speech Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 0
          - ServiceID: BLND
            ServiceName: Visually Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 1
          - ServiceID: WCHR
            ServiceName: Wheelchair
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 2
          - ServiceID: DEAF
            ServiceName: Hearing and/or Speech Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 0
          - ServiceID: BLND
            ServiceName: Visually Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 1
          - ServiceID: WCHR
            ServiceName: Wheelchair
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 2
          - ServiceID: DEAF
            ServiceName: Hearing and/or Speech Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 0
          - ServiceID: BLND
            ServiceName: Visually Impaired
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 1
          - ServiceID: WCHR
            ServiceName: Wheelchair
            ServicePrice: 0
            Currency: EUR
            SegmentNumber: 2`
          }
        }
      },
      {
        id: "MakePayment",
        name: "MakePayment",
        method: "POST",
        path: "/makePayment",
        description: "Simple MakePayment endpoint to check API availability",
        requests: {
          "200": {
            description: "Success",
            example: `MakePaymentRQ:
  MessageHeader:
    RequestID: 1765283537080
    API_KEY: DEV_d3fa683536b7df801f17ab802cb5d92908e879665b40d618
  OrderDetails:
    orderId: '7988'
    airline_pnr: FC9Q8E
  PaymentAmount:
    Amount: '683.80'
    Currency: MYR
  PaymentMethod:
    PaymentType: CC
    CardDetails:
      Number: '4111111111111111'
      Name: Jhon Doe
      ExpiryDate: '1226'
      cvv: '123'
      CardType: VI`
          }
        },
        responses: {
          "200": {
            description: "Success",
            example: `MakePaymentRS:
  MessageHeader:
    Status: Success
    Timestamp: '2025-12-09T12:32:27.880931'
    RequestID: 1765283537080
  Message: Payment Processed Successfully.`
          }
        }
      },
      {
        id: "OrderCreate",
        name: "OrderCreate",
        method: "POST",
        path: "/orderCreate",
        description: "Simple OrderCreate endpoint to check API availability",
        requests: {
          "200": {
            description: "Success",
            example: `OrderCreateRQ:
  MessageHeader:
    RequestID: ''
    API_KEY: 5c4b6c6407f45dbc75ca0357a89d271617de965c
    SearchType: O
    AirlineCode:
      - MH
  DataList:
    PassengerList:
      - PassengerID: PAX-1
        PTC: ADT
        Name:
          Surname: Alpha
          Given: Ajmal
          Title: Mr
        DOB: '1990-01-01'
        Gender: Male
        parentId: null
        ContactInfo:
          EmailAddress: test1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456789'
      - PassengerID: PAX-2
        PTC: ADT
        Name:
          Surname: Beta
          Given: Sarah
          Title: Ms
        DOB: '1991-02-02'
        Gender: Female
        parentId: null
        ContactInfo:
          EmailAddress: test2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456780'
      - PassengerID: PAX-3
        PTC: ADT
        Name:
          Surname: Gamma
          Given: Robert
          Title: Mr
        DOB: '1992-03-03'
        Gender: Male
        parentId: null
        ContactInfo:
          EmailAddress: test3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456781'
      - PassengerID: PAX-4
        PTC: CHD
        Name:
          Surname: Child
          Given: One
          Title: Mstr
        DOB: '2016-01-01'
        Gender: Male
        parentId: null
        ContactInfo:
          EmailAddress: child1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '111111111'
      - PassengerID: PAX-5
        PTC: CHD
        Name:
          Surname: Child
          Given: Two
          Title: Mstr
        DOB: '2018-02-02'
        Gender: Male
        parentId: null
        ContactInfo:
          EmailAddress: child2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '222222222'
      - PassengerID: PAX-6
        PTC: CHD
        Name:
          Surname: Child
          Given: Three
          Title: Mstr
        DOB: '2017-05-05'
        Gender: Male
        parentId: null
        ContactInfo:
          EmailAddress: child3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '333333333'
      - PassengerID: PAX-7
        PTC: INF
        Name:
          Surname: Alpha
          Given: BabyOne
          Title: Inf
        DOB: '2024-06-01'
        Gender: Male
        parentId: PAX-1
        ContactInfo:
          EmailAddress: infant1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '444444444'
      - PassengerID: PAX-8
        PTC: INF
        Name:
          Surname: Beta
          Given: BabyTwo
          Title: Inf
        DOB: '2024-07-02'
        Gender: Male
        parentId: PAX-2
        ContactInfo:
          EmailAddress: infant2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '555555555'
      - PassengerID: PAX-9
        PTC: INF
        Name:
          Surname: Gamma
          Given: BabyThree
          Title: Inf
        DOB: '2024-08-03'
        Gender: Male
        parentId: PAX-3
        ContactInfo:
          EmailAddress: infant3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '666666666'
    ItineraryList:
      OfferPrice:
        TotalAmount: 2041.41
        CurrencyCode: MYR
      FareFamily: ECOLETIMY
      Flights:
        - - SegmentRefID: 'MYY_KUL_MH-2593_2025-12-28T17:30_2025-12-28T19:55'
            FareProductID: 'M_Y#ANLGOWMY/CNLGOWMYCH/INLGOWMYIN'
          - SegmentRefID: 'KUL_PEN_MH-1166_2025-12-28T20:55_2025-12-28T21:55'
            FareProductID: 'M_Y#ANLGOWMY/CNLGOWMYCH/INLGOWMYIN'
    OfferPriceDetail:
      TotalAmount: 2041.41
      CurrencyCode: MYR
      BaseAmount: 1713
      Taxes: 328.41
      Details:
        FareComponent:
          - PassengerType: ADT
            Quantity: 3
            TotalFare: 341.91
            BaseAmount: 287
            Taxes: 54.91
            CurrencyCode: MYR
            FareBasisCode: NLGOWMY
            RBD: 'N'
          - PassengerType: CHD
            Quantity: 3
            TotalFare: 307.28
            BaseAmount: 255
            Taxes: 52.28
            CurrencyCode: MYR
            FareBasisCode: NLGOWMYCH
            RBD: 'N'
          - PassengerType: INF
            Quantity: 3
            TotalFare: 31.28
            BaseAmount: 29
            Taxes: 2.28
            CurrencyCode: MYR
            FareBasisCode: NLGOWMYIN
            RBD: 'N'
        TaxSummary:
          - TaxCode: YQ
            Amount: 24
            Description: Carrier Imposed Fees (YQ)
          - TaxCode: D8
            Amount: 47.47
            Description: Malaysia Service Tax (D8)
          - TaxCode: H8
            Amount: 2
            Description: ''
          - TaxCode: MY
            Amount: 36
            Description: 'Malaysia: Passenger Service Charge (MY)'`
          }
        },
        responses: {
          "200": {
            description: "Success",
            example: `OrderCreateRS:
  MessageHeader:
    RequestID: '654321'
    Status: Success
    SearchType: O
    AirlineCode:
      - MH
  OrderDetails:
    orderId: '7797'
    airline_pnr: F7P3ND
    ttlTime: 7200
  DataList:
    PassengerTypeQuantity:
      - ADT: 3
        CHD: 3
        INF: 3
    PassengerList:
      - PassengerID: PAX-1
        PTC: ADT
        Name:
          Surname: Alpha
          Given: James
          Title: Mr
        ContactInfo:
          EmailAddress: test1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456789'
      - PassengerID: PAX-2
        PTC: ADT
        Name:
          Surname: Beta
          Given: Sarah
          Title: Ms
        ContactInfo:
          EmailAddress: test2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456780'
      - PassengerID: PAX-3
        PTC: ADT
        Name:
          Surname: Gamma
          Given: Robert
          Title: Mr
        ContactInfo:
          EmailAddress: test3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '123456781'
      - PassengerID: PAX-4
        PTC: CHD
        Name:
          Surname: Child
          Given: One
          Title: Mstr
        ContactInfo:
          EmailAddress: child1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '111111111'
      - PassengerID: PAX-5
        PTC: CHD
        Name:
          Surname: Child
          Given: Two
          Title: Mstr
        ContactInfo:
          EmailAddress: child2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '222222222'
      - PassengerID: PAX-6
        PTC: CHD
        Name:
          Surname: Child
          Given: Three
          Title: Mstr
        ContactInfo:
          EmailAddress: child3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '333333333'
      - PassengerID: PAX-7
        PTC: INF
        Name:
          Surname: Alpha
          Given: BabyOne
          Title: Inf
        ContactInfo:
          EmailAddress: infant1@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '444444444'
      - PassengerID: PAX-8
        PTC: INF
        Name:
          Surname: Beta
          Given: BabyTwo
          Title: Inf
        ContactInfo:
          EmailAddress: infant2@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '555555555'
      - PassengerID: PAX-9
        PTC: INF
        Name:
          Surname: Gamma
          Given: BabyThree
          Title: Inf
        ContactInfo:
          EmailAddress: infant3@example.com
          PhoneNumber:
            CountryCode: '+60'
            Number: '666666666'
    ItineraryList:
      OfferPrice:
        TotalAmount: 2041.41
        CurrencyCode: MYR
      FareFamily: ECOLETIMY
      Flights:
        - - SegmentRefID: 'MYY_KUL_MH-2593_2025-12-28T17:30_2025-12-28T19:55'
            FareProductID: 'N_Y#A_NLGOWMY/C_NLGOWMYCH/I_NLGOWMYIN'
          - SegmentRefID: 'KUL_PEN_MH-1166_2025-12-28T20:55_2025-12-28T21:55'
            FareProductID: 'N_Y#A_NLGOWMY/C_NLGOWMYCH/I_NLGOWMYIN'
    OfferPriceDetail:
      TotalAmount: 2041.41
      CurrencyCode: MYR
      BaseAmount: 1713
      Taxes: 328.41
      Details:
        FareComponent:
          - PassengerType: ADT
            Quantity: 3
            TotalFare: 341.91
            BaseAmount: 287
            Taxes: 54.91
            CurrencyCode: MYR
            FareBasisCode: NLGOWMY
            RBD: 'N'
          - PassengerType: CHD
            Quantity: 3
            TotalFare: 307.28
            BaseAmount: 255
            Taxes: 52.28
            CurrencyCode: MYR
            FareBasisCode: NLGOWMYCH
            RBD: 'N'
          - PassengerType: INF
            Quantity: 3
            TotalFare: 31.28
            BaseAmount: 29
            Taxes: 2.28
            CurrencyCode: MYR
            FareBasisCode: NLGOWMYIN
            RBD: 'N'
        TaxSummary:
          - TaxCode: YQ
            Amount: 24
            Description: Carrier Imposed Fees (YQ)
          - TaxCode: D8
            Amount: 47.47
            Description: Malaysia Service Tax (D8)
          - TaxCode: H8
            Amount: 2
            Description: ''
          - TaxCode: MY
            Amount: 36
            Description: 'Malaysia: Passenger Service Charge (MY)'`
          }
        }
      },

    ]
  }
};

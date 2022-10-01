interface headerObject {
    headerTitle: string;
    headerContentText: string;
    childHeadersArrayOfObjects: Array<headerObject> | string;
}

export { headerObject };

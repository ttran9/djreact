export const updateObject = (oldObject,  updatedProperties) => {
    return {
        /*
         * create a clone of our old object and replace it with our updated keys.
         */
        ...oldObject,
        ...updatedProperties
    }
}
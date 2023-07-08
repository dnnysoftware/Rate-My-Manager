
/**
 * Calculates the average rating from a list of ratings 
 * @param {*} props retieves a manager with a list of ratings
 * @returns the average rating as a derived attribute
 */
export default function AvgRate(props) { 

    const calculateAverageRating = (manager) => {
        if (manager.ratings && manager.ratings.length > 0) {
            const sum = manager.ratings.reduce((total, rating) => total + rating.rating, 0);
            const average = sum / manager.ratings.length;
            return average.toFixed(2);
        }
        return 0;
    };

    return (
        <>
            {calculateAverageRating(props.manager)}
        </>
    );
}
import { Loader } from 'lucide-react';

function Spinner({ size = '' }) {
    const sizeIcon = size === 'sm' ? 16 : size === 'md' ? 18 : size === 'lg' ? 20 : 18;
    return (
        <div className="animate-spin">
            <Loader size={sizeIcon} />
        </div>
    );
}

export default Spinner;

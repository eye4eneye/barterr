export class Sneaker {
    sneakerId?: any;

    productImageUrl: string;
    name: string;
    // Search Attributes
    brand?: string;
    styleId?: string;
    apiID?: string;
    size?: number;
    condition?: number;
    fromCloset?: boolean;


    ogAll?: boolean;
    details?: {
      box: boolean,
      insoles: boolean,
      laces: boolean,
      flaws: string,
    };

    avgDSprice?: number;

    photos?: boolean;
}

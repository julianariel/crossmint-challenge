// color values for Soloon objects
export type SoloonColor = "blue" | "red" | "purple" | "white";
// direction values for Cometh objects
export type ComethDirection = "up" | "down" | "left" | "right";

// Base class for all astral objects
export class Astro {
  // Name of the API endpoint associated with the object
  apiName: string;

  // Position in the map
  row: number;
  column: number;

  constructor(row: number, column: number) {
    this.apiName = ""; // Initialize apiName as an empty string; subclasses will override this
    this.row = row;
    this.column = column;
  }
}

// Polyanet class extends the base Astro class
export class Polyanet extends Astro {
  apiName = "polyanets";
}

// Soloon class extends the base Astro class, adding a color property
export class Soloon extends Astro {
  apiName = "soloons";
  color: SoloonColor;
  constructor(row: number, column: number, color: SoloonColor) {
    super(row, column);
    this.color = color;
  }
}

// Cometh class extends the base Astro class, adding a direction property
export class Cometh extends Astro {
  apiName = "comeths";
  direction: ComethDirection;
  constructor(row: number, column: number, direction: ComethDirection) {
    super(row, column);
    this.direction = direction;
  }
}

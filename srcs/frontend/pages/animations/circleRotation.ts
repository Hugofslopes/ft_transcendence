/**
 * Circle Rotation System
 * Handles rotating elements based on button hover interactions
 */

export class CircleRotation {
  private currentAngle: number = 0;
  private element: HTMLElement | null = null;
  private readonly storageKey = 'circleRotationAngle';

  // Define button positions and their corresponding angles
  private readonly buttonAngles: Record<string, number> = {
    'play-btn': 270,      // gris-btn-top (top = 270° in circle coordinates)
    'login-btn': 180,     // gris-btn-left (left = 180°)
    'tournaments-btn': 90, // gris-btn-bottom (bottom = 90°)
    'logout-btn': 0       // gris-btn-right (right = 0°)
  };

  /**
   * Initialize the circle rotation system
   * @param elementId - ID of the element to rotate
   */
  public init(elementId: string): void {
    this.element = document.getElementById(elementId);
    if (!this.element) {
      console.warn(`Rotatable element with ID "${elementId}" not found`);
      return;
    }

    // Restore saved angle from localStorage
    this.restoreAngle();
    
    // Apply current angle immediately without animation
    this.applyAngleDirectly(this.currentAngle);

    this.setupButtonHoverListeners();
    this.setupVisibilityHandlers();
  }

  /**
   * Setup handlers for page visibility changes and focus events
   */
  private setupVisibilityHandlers(): void {
    // Handle visibility change (alt-tab, minimize, etc.)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.element) {
        // Page became visible again - reapply current angle
        this.applyAngleDirectly(this.currentAngle);
      }
    });

    // Handle window focus events as backup
    window.addEventListener('focus', () => {
      if (this.element) {
        this.applyAngleDirectly(this.currentAngle);
      }
    });

    // Save angle before page unload
    window.addEventListener('beforeunload', () => {
      this.saveAngle();
    });
  }

  /**
   * Apply angle directly without animation
   * @param angle - Angle to apply in degrees
   */
  private applyAngleDirectly(angle: number): void {
    if (!this.element) return;
    
    this.element.style.transformOrigin = '960px 540px';
    this.element.style.transform = `rotate(${angle}deg)`;
    this.element.style.animation = 'none'; // Clear any existing animations
  }

  /**
   * Save current angle to localStorage
   */
  private saveAngle(): void {
    try {
      localStorage.setItem(this.storageKey, this.currentAngle.toString());
    } catch (error) {
      console.warn('Failed to save rotation angle:', error);
    }
  }

  /**
   * Restore angle from localStorage
   */
  private restoreAngle(): void {
    try {
      const savedAngle = localStorage.getItem(this.storageKey);
      if (savedAngle !== null) {
        this.currentAngle = parseFloat(savedAngle) || 0;
      }
    } catch (error) {
      console.warn('Failed to restore rotation angle:', error);
      this.currentAngle = 0;
    }
  }

  /**
   * Calculate the shortest angular path between two angles
   * @param startAngle - Starting angle in degrees
   * @param endAngle - Ending angle in degrees
   * @returns Object with optimized start and end angles
   */
  private calculateShortestPath(startAngle: number, endAngle: number): { start: number; end: number } {
    // Normalize angles to 0-360 range
    const normalizeAngle = (angle: number): number => {
      return ((angle % 360) + 360) % 360;
    };

    const start = normalizeAngle(startAngle);
    const end = normalizeAngle(endAngle);
    
    // Calculate the difference
    let diff = end - start;
    
    // If the difference is greater than 180°, go the other way
    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }
    
    // Return the optimized end angle
    return {
      start: startAngle, // Keep original start angle for continuity
      end: startAngle + diff // Shortest path end angle
    };
  }

  /**
   * Rotate an element from start angle to end angle
   * @param element - The DOM element to rotate
   * @param startAngle - Starting angle in degrees
   * @param endAngle - Ending angle in degrees
   * @param duration - Animation duration in milliseconds
   */
  public rotateElement(
    element: HTMLElement, 
    startAngle: number, 
    endAngle: number, 
    duration: number = 800
  ): void {
    if (!element) {
      console.error('Element not found for rotation');
      return;
    }
    
    // Calculate shortest path
    const path = this.calculateShortestPath(startAngle, endAngle);
    
    // Create unique animation name
    const animationName = `rotate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Create keyframes
    const keyframes = `
      @keyframes ${animationName} {
        0% {
          transform: rotate(${path.start}deg);
        }
        100% {
          transform: rotate(${path.end}deg);
        }
      }
    `;
    
    // Add keyframes to document
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    
    // Apply animation
    element.style.transformOrigin = '960px 540px'; // Center point
    element.style.animation = `${animationName} ${duration}ms ease-out forwards`;
    
    // Clean up after animation
    setTimeout(() => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }, duration + 100);
  }

  /**
   * Setup hover listeners for buttons
   */
  private setupButtonHoverListeners(): void {
    if (!this.element) return;

    Object.keys(this.buttonAngles).forEach(buttonId => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener('mouseenter', () => {
          this.rotateToButton(buttonId);
        });
      }
    });
  }

  /**
   * Rotate to a specific button's angle
   * @param buttonId - ID of the button to rotate towards
   */
  private rotateToButton(buttonId: string): void {
    if (!this.element || !(buttonId in this.buttonAngles)) return;

    const targetAngle = this.buttonAngles[buttonId];
    this.rotateElement(this.element, this.currentAngle, targetAngle, 800);
    this.currentAngle = targetAngle;
    
    // Save the new angle to localStorage
    this.saveAngle();
  }

  /**
   * Get the current rotation angle
   */
  public getCurrentAngle(): number {
    return this.currentAngle;
  }

  /**
   * Manually set the current angle (useful for initialization)
   */
  public setCurrentAngle(angle: number): void {
    this.currentAngle = angle;
    this.saveAngle();
    
    if (this.element) {
      this.applyAngleDirectly(angle);
    }
  }

  /**
   * Add a new button to the rotation system
   * @param buttonId - ID of the button
   * @param angle - Angle in degrees for this button
   */
  public addButton(buttonId: string, angle: number): void {
    this.buttonAngles[buttonId] = angle;
    
    const button = document.getElementById(buttonId);
    if (button && this.element) {
      button.addEventListener('mouseenter', () => {
        this.rotateToButton(buttonId);
      });
    }
  }

  /**
   * Remove a button from the rotation system
   * @param buttonId - ID of the button to remove
   */
  public removeButton(buttonId: string): void {
    delete this.buttonAngles[buttonId];
  }
}

// Export a singleton instance for easy use
export const circleRotation = new CircleRotation();
